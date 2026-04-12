---
includes:
  - "service:action"
  - case-insensitive
---
resource "aws_iam_policy" "example" {
  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Effect = "Allow"
        Act$0ion = ["s3:GetObject"]
      }
    ]
  })
}
