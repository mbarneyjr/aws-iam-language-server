---
includes:
  - "arn:aws:s3:us-east-1:123456789012:accesspoint/${AccessPointName}"
  - "arn:aws:s3:us-east-1:123456789012:job/${JobId}"
excludes:
  - "arn:aws:s3:::${BucketName}"
  - "arn:aws:s3:::${BucketName}/${ObjectName}"
---
resource "aws_iam_policy" "example" {
  policy = jsonencode({
    Version   = "2012-10-17"
    Statement = [{
      Effect = "Allow"
      Action = ["s3:GetObject"]
      Resource = [
        "arn:aws:s3:us-east-1:123456789012:$0
      ]
    }]
  })
}
