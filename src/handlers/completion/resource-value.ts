import type { CompletionItem, CompletionList } from 'vscode-languageserver';
import { CompletionItemKind } from 'vscode-languageserver';
import type { ResourceValueLocation } from '../../lib/iam-policy/location.ts';
import { partitions } from '../../lib/iam-policy/partitions.ts';
import { ServiceReference } from '../../lib/iam-policy/reference/services.ts';
import { expandActionPattern } from '../../lib/iam-policy/wildcard.ts';
import type { CompletionContext } from './index.ts';

export function completeResourceValue(location: ResourceValueLocation, context: CompletionContext): CompletionList {
  const parts = location.partial.split(':');
  const items: Array<CompletionItem> = [];
  const statement = context.handler.getStatementContext(context.uri, context.position);
  const statementActions = statement?.Action ?? statement?.NotAction ?? [];
  const expandedActions = statementActions.flatMap(expandActionPattern);
  const actionArns = ServiceReference.getArnsForActions(expandedActions);
  for (const arn of actionArns) {
    if (location.partial && !arn.toLowerCase().startsWith(location.partial.toLowerCase())) continue;
    items.push({
      label: arn,
      sortText: `0-${arn}`,
      kind: CompletionItemKind.Value,
    });
  }
  if (parts.length === 1) {
    // suggest only arn
    const label = 'arn';
    if (!location.partial || label.toLowerCase().startsWith(location.partial.toLowerCase())) {
      items.push({
        label,
        kind: CompletionItemKind.Constant,
      });
    }
  } else if (parts.length === 2) {
    // suggest partitions
    const potentialItems: Array<CompletionItem> = Object.entries(partitions).map(([id, partition]) => ({
      label: id,
      kind: CompletionItemKind.Enum,
      documentation: {
        kind: 'markdown',
        value: `# ${partition.name}`,
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
    const arns = ServiceReference.getArnsForService(service);
    const hasRegionArn = arns.find((arn) => arn.includes(`\${Region}`));
    if (!hasRegionArn) {
      items.push({
        label: ':',
        kind: CompletionItemKind.Enum,
        documentation: {
          kind: 'markdown',
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
              kind: 'markdown',
              value: `# ${region.name}`,
            },
          });
        }
      }
    }
  } else if (parts.length === 5) {
    // suggest account
    items.push({
      label: `${location.partial}:`,
      kind: CompletionItemKind.Enum,
      documentation: {
        kind: 'markdown',
        value: '# AWS Account ID',
      },
    });
  } else {
    // suggest service resources
    const service = parts[2];
    const region = parts[3];
    const account = parts[4];
    const potentialLabels = ServiceReference.getArnsForService(service).filter((pattern) => {
      const patternParts = pattern.split(':');
      const patternRegion = patternParts[3];
      const patternAccount = patternParts[4];
      if (region.length > 0 !== patternRegion.length > 0) return false;
      if (account.length > 0 !== patternAccount.length > 0) return false;
      return true;
    });
    for (const labelPattern of potentialLabels) {
      const label = labelPattern
        .replace(`\${Partition}`, parts[1])
        .replace(`\${Region}`, parts[3])
        .replace(`\${Account}`, parts[4]);
      if (location.partial && !label.toLowerCase().startsWith(location.partial.toLowerCase())) continue;
      items.push({
        label,
        kind: CompletionItemKind.Enum,
      });
    }
  }

  return { items, isIncomplete: false };
}
