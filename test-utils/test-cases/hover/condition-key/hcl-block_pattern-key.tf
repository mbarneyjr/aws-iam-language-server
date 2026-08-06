---
includes:
  - aws:RequestTag/${TagKey}
---
data "aws_iam_policy_document" "example" {
  statement {
    effect    = "Allow"
    actions   = ["s3:GetObject"]
    resources = ["*"]

    condition {
      test     = "StringEquals"
      variable = "aws:RequestTag/Depart$0ment"
      values   = ["engineering"]
    }
  }
}
