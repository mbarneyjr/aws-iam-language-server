---
exact: true
includes: []
---
resource "aws_iam_policy" "s3_read_only_policy" {
  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [{
      Effect = $0
    }]
  })
}
