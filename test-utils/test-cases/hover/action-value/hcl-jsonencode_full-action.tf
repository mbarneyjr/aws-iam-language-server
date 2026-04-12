---
includes:
  - "s3:GetObject"
  - Access Level
---
resource "aws_iam_policy" "example" {
  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Effect = "Allow"
        Action = ["s3:Get$0Object"]
      }
    ]
  })
}
