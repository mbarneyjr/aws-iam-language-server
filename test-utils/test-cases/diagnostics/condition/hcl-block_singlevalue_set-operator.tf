---
code: UNNECESSARY_SET_OPERATOR
count: 1
includes:
  - kms:RequestAlias
range:
  start: { line: 7, character: 18 }
  end: { line: 7, character: 42 }
---
data "aws_iam_policy_document" "example" {
  statement {
    effect    = "Allow"
    actions   = ["kms:Decrypt"]
    resources = ["*"]

    condition {
      test     = "ForAnyValue:StringEquals"
      variable = "kms:RequestAlias"
      values   = ["alias/example"]
    }
  }
}
