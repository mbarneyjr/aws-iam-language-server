---
includes:
  - aws
  - aws-us-gov
  - aws-cn
---
resource "aws_iam_policy" "example" {
  policy = jsonencode({
    Version   = "2012-10-17"
    Statement = [{
      Effect = "Allow"
      Action = ["s3:GetObject"]
      Resource = [
        "arn:$0
      ]
    }]
  })
}
