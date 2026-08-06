---
code: INVALID_CONDITION_OPERATOR
count: 1
includes:
  - StringEqual
range:
  start: { line: 7, character: 18 }
  end: { line: 7, character: 29 }
---
data "aws_iam_policy_document" "example" {
  statement {
    effect    = "Allow"
    actions   = ["kms:Decrypt"]
    resources = ["*"]

    condition {
      test     = "StringEqual"
      variable = "kms:RequestAlias"
      values   = ["alias/example"]
    }
  }
}
