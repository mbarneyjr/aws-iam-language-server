---
includes:
  - "arn:aws:s3::123456789012:accesspoint/${AccessPointAlias}"
excludes:
  - "arn:aws:s3:::${BucketName}"
---
resource "aws_iam_policy" "example" {
  policy = jsonencode({
    Version   = "2012-10-17"
    Statement = [{
      Effect = "Allow"
      Action = ["s3:GetObject"]
      Resource = [
        "arn:aws:s3::123456789012:$0
      ]
    }]
  })
}
