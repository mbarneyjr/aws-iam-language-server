---
includes:
  - s3:GetObject
excludes:
  - lambda:InvokeFunction
---
resource "aws_iam_policy" "example" {
  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [{
      Effect = "Allow"
      Action = [
        "s3:G$0"
      ]
    }]
  })
}
