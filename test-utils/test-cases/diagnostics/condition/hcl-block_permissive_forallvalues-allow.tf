---
code: PERMISSIVE_SET_OPERATOR
count: 1
includes:
  - aws:TagKeys
range:
  start: { line: 7, character: 18 }
  end: { line: 7, character: 43 }
---
data "aws_iam_policy_document" "example" {
  statement {
    effect    = "Allow"
    actions   = ["kms:Decrypt"]
    resources = ["*"]

    condition {
      test     = "ForAllValues:StringEquals"
      variable = "aws:TagKeys"
      values   = ["department"]
    }
  }
}
