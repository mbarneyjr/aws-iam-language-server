---
includes:
  - s3:GetObject
excludes:
  - s3-outposts:CreateBucket
  - lambda:InvokeFunction
  - Sid
  - Effect
  - Principal
  - NotPrincipal
  - Action
  - NotAction
  - Resource
  - NotResource
  - Condition
---
resource "aws_iam_policy" "example" {
  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [{
      Effect = "Allow"
      Action = [
        "s3:$0"
      ]
    }]
  })
}
