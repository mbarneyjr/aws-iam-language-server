---
includes:
  - "lambda.amazonaws.com"
  - "s3.amazonaws.com"
excludes:
  - "*"
  - "arn:${Partition}:iam::${Account}:root"
---
resource "aws_iam_role" "example" {
  assume_role_policy = jsonencode({
    Version   = "2012-10-17"
    Statement = [
      {
        Effect    = "Allow"
        Action    = "sts:AssumeRole"
        Principal = {
          Service = ["$0"]
        }
      }
    ]
  })
}
