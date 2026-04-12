---
includes:
  - "aws"
  - "aws-cn"
  - "aws-us-gov"
---
resource "aws_iam_role" "example" {
  assume_role_policy = jsonencode({
    Version   = "2012-10-17"
    Statement = [
      {
        Effect    = "Allow"
        Action    = "sts:AssumeRole"
        Principal = {
          AWS = ["arn:$0"]
        }
      }
    ]
  })
}
