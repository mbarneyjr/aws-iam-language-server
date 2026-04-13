import type { CompletionItem, CompletionList } from 'vscode-languageserver';
import { CompletionItemKind, MarkupKind } from 'vscode-languageserver';
import { splitArn } from '../../lib/iam-policy/arn.ts';
import type { ResourceValueLocation } from '../../lib/iam-policy/location.ts';
import { partitions } from '../../lib/iam-policy/partitions.ts';
import { formatResourceDocumentation } from '../../lib/iam-policy/reference/documentation.ts';
import { ServiceReference } from '../../lib/iam-policy/reference/services.ts';
import { expandActionPattern } from '../../lib/iam-policy/wildcard.ts';
import { type CompletionContext, partialRange } from './index.ts';

export function completeResourceValue(location: ResourceValueLocation, context: CompletionContext): CompletionList {
  const parts = splitArn(location.partial);
  const range = partialRange(context.position, location.partial.length);
  const items: Array<CompletionItem> = [];
  const statement = context.handler.getStatementContext(context.uri, context.position);
  const statementActions = statement?.Action ?? statement?.NotAction ?? [];
  const expandedActions = statementActions.flatMap(expandActionPattern);
  const resources = ServiceReference.getResourcesForActions(expandedActions);
  for (const resource of resources) {
    for (const arn of resource.arnFormats) {
      if (location.partial && !arn.toLowerCase().startsWith(location.partial.toLowerCase())) continue;
      items.push({
        label: arn,
        sortText: `0-${arn}`,
        kind: CompletionItemKind.Value,
        textEdit: { range, newText: arn },
        documentation: {
          kind: MarkupKind.Markdown,
          value: formatResourceDocumentation(resource),
        },
      });
    }
  }

  if (parts.length === 1) {
    // suggest only arn
    const label = 'arn';
    if (!location.partial || label.toLowerCase().startsWith(location.partial.toLowerCase())) {
      items.push({
        label,
        kind: CompletionItemKind.Constant,
        textEdit: { range, newText: label },
      });
    }
  } else if (parts.length === 2) {
    // suggest partitions
    const potentialItems: Array<CompletionItem> = Object.entries(partitions).map(([id, partition]) => ({
      label: id,
      kind: CompletionItemKind.Enum,
      documentation: {
        kind: MarkupKind.Markdown,
        value: partition.name,
      },
    }));
    for (const item of potentialItems) {
      if (!location.partial || `${parts[0]}:${item.label.toLowerCase()}`.startsWith(location.partial.toLowerCase())) {
        items.push(item);
      }
    }
  } else if (parts.length === 3) {
    // suggest services
    const services = ServiceReference.getAllServices();
    for (const service of services) {
      if (
        !location.partial ||
        `${parts[0]}:${parts[1]}:${service}`.toLowerCase().startsWith(location.partial.toLowerCase())
      ) {
        items.push({
          label: service,
          kind: CompletionItemKind.Enum,
        });
      }
    }
  } else if (parts.length === 4) {
    // suggest regions
    const partition =
      parts[1] === 'aws' || parts[1] === 'aws-us-gov' || parts[1] === 'aws-cn' ? partitions[parts[1]] : partitions.aws;
    const service = parts[2];
    const resources = ServiceReference.getResourcesForActions(expandActionPattern(`${service}:*`));
    let hasRegionArn = false;
    for (const resource of resources) {
      for (const arn of resource.arnFormats) {
        if (arn.includes(`\${Region}`)) hasRegionArn = true;
      }
    }
    if (!hasRegionArn) {
      items.push({
        label: ':',
        kind: CompletionItemKind.Enum,
        documentation: {
          kind: MarkupKind.Markdown,
          value: 'This service has no ARNs with a region component',
        },
      });
    } else {
      for (const region of partition.regions) {
        if (
          !location.partial ||
          `${parts[0]}:${parts[1]}:${parts[2]}:${region.id}`.toLowerCase().startsWith(location.partial.toLowerCase())
        ) {
          items.push({
            label: region.id,
            kind: CompletionItemKind.Enum,
            documentation: {
              kind: MarkupKind.Markdown,
              value: region.name,
            },
          });
        }
      }
    }
  } else if (parts.length === 5) {
    // suggest account
    const label = `${location.partial}:`;
    items.push({
      label,
      kind: CompletionItemKind.Enum,
      textEdit: { range, newText: label },
      documentation: {
        kind: MarkupKind.Markdown,
        value: 'AWS Account ID',
      },
    });
  } else {
    // suggest service resources
    const service = parts[2];
    const region = parts[3];
    const account = parts[4];
    const resources = ServiceReference.getResourcesForActions(expandActionPattern(`${service}:*`));
    for (const resource of resources) {
      for (const arn of resource.arnFormats) {
        const patternParts = splitArn(arn);
        const patternRegion = patternParts[3];
        const patternAccount = patternParts[4];
        if (region.length > 0 !== patternRegion.length > 0) continue;
        if (account.length > 0 !== patternAccount.length > 0) continue;
        const label = arn
          .replace(`\${Partition}`, parts[1])
          .replace(`\${Region}`, parts[3])
          .replace(`\${Account}`, parts[4]);
        if (location.partial && !label.toLowerCase().startsWith(location.partial.toLowerCase())) continue;
        items.push({
          label,
          kind: CompletionItemKind.Enum,
          textEdit: { range, newText: label },
          detail: resource.name,
          documentation: {
            kind: MarkupKind.Markdown,
            value: [`**Condition Keys**:`, '', resource.conditionKeys.map((key) => `- \`${key}\``).join('\n')].join(
              '\n',
            ),
          },
        });
      }
    }
  }

  return { items, isIncomplete: false };
}
