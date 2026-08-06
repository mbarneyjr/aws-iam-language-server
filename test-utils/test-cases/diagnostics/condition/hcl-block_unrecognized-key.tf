---
code: UNRECOGNIZED_CONDITION_KEY
count: 1
includes:
  - kms:NotARealConditionKey
range:
  start: { line: 8, character: 18 }
  end: { line: 8, character: 42 }
---
data "aws_iam_policy_document" "example" {
  statement {
    effect    = "Allow"
    actions   = ["kms:Decrypt"]
    resources = ["*"]

    condition {
      test     = "StringEquals"
      variable = "kms:NotARealConditionKey"
      values   = ["alias/example"]
    }
  }
}
