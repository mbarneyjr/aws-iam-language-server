---
includes:
  - us-east-1
  - us-west-2
  - eu-west-1
excludes:
  - ":"
---
resource "aws_iam_policy" "example" {
  policy = jsonencode({
    Version   = "2012-10-17"
    Statement = [{
      Effect = "Allow"
      Action = ["lambda:InvokeFunction"]
      Resource = [
        "arn:aws:lambda:$0
      ]
    }]
  })
}
