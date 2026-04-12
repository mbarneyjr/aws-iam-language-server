---
includes:
  - object or objects
  - ARN
---
resource "aws_iam_policy" "example" {
  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Effect = "Allow"
        Action = ["s3:GetObject"]
        Reso$0urce = ["*"]
      }
    ]
  })
}
