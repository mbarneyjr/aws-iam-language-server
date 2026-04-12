---
includes:
  - "*"
  - "${Account}"
  - "arn:${Partition}:iam::${Account}:root"
excludes:
  - "lambda.amazonaws.com"
---
resource "aws_iam_role" "example" {
  assume_role_policy = jsonencode({
    Version   = "2012-10-17"
    Statement = [
      {
        Effect    = "Allow"
        Action    = "sts:AssumeRole"
        Principal = {
          AWS = ["$0"]
        }
      }
    ]
  })
}
