---
includes:
  - ":"
excludes:
  - us-east-1
  - us-west-2
---
resource "aws_iam_policy" "example" {
  policy = jsonencode({
    Version   = "2012-10-17"
    Statement = [{
      Effect = "Allow"
      Action = ["iam:GetRole"]
      Resource = [
        "arn:aws:iam:$0
      ]
    }]
  })
}
