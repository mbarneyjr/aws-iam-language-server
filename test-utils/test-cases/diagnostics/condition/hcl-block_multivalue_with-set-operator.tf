---
code: MISSING_SET_OPERATOR
count: 0
---
data "aws_iam_policy_document" "example" {
  statement {
    effect    = "Allow"
    actions   = ["kms:Decrypt"]
    resources = ["*"]

    condition {
      test     = "ForAnyValue:StringEquals"
      variable = "kms:ResourceAliases"
      values   = ["alias/example"]
    }
  }
}
