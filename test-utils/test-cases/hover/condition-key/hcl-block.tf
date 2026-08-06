---
includes:
  - s3:ResourceAccount
---
data "aws_iam_policy_document" "example" {
  statement {
    effect    = "Allow"
    actions   = ["s3:GetObject"]
    resources = ["*"]

    condition {
      test     = "StringEquals"
      variable = "s3:Resource$0Account"
      values   = ["111122223333"]
    }
  }
}
