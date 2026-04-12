---
excludes:
  - "arn:aws:s3:us-east-1::accesspoint/${AccessPointName}"
  - "arn:aws:s3:::${BucketName}"
---
resource "aws_iam_policy" "example" {
  policy = jsonencode({
    Version   = "2012-10-17"
    Statement = [{
      Effect = "Allow"
      Action = ["s3:GetObject"]
      Resource = [
        "arn:aws:s3:us-east-1::$0
      ]
    }]
  })
}
