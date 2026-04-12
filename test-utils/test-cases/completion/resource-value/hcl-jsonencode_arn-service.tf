---
includes:
  - s3
  - iam
  - ec2
  - lambda
---
resource "aws_iam_policy" "example" {
  policy = jsonencode({
    Version   = "2012-10-17"
    Statement = [{
      Effect = "Allow"
      Action = ["s3:GetObject"]
      Resource = [
        "arn:aws:$0
      ]
    }]
  })
}
