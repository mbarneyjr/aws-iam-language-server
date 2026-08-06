---
includes:
  - s3:ResourceAccount
---
resource "aws_iam_policy" "example" {
  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [{
      Effect   = "Allow"
      Action   = ["s3:GetObject"]
      Resource = "*"
      Condition = {
        StringEquals = {
          "s3:Resource$0Account" = ["111122223333"]
        }
      }
    }]
  })
}
