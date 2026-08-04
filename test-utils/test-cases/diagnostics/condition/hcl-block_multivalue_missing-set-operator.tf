---
code: MISSING_SET_OPERATOR
count: 1
includes:
  - kms:ResourceAliases
  - ForAnyValue
range:
  start: { line: 7, character: 18 }
  end: { line: 7, character: 30 }
---
data "aws_iam_policy_document" "example" {
  statement {
    effect    = "Allow"
    actions   = ["kms:Decrypt"]
    resources = ["*"]

    condition {
      test     = "StringEquals"
      variable = "kms:ResourceAliases"
      values   = ["alias/example"]
    }
  }
}
