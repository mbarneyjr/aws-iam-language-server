---
includes: []
excludes:
  - s3:GetObject
  - lambda:InvokeFunction
---
resource "aws_iam_policy" "example" {
  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [{
      Effect = "Allow"
      Action = [
        $0
      ]
    }]
  })
}
