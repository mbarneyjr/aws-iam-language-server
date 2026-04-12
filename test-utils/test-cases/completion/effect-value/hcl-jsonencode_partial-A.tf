---
exact: true
includes:
  - Allow
---
resource "aws_iam_policy" "example" {
  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [{
      Effect = "A$0"
    }]
  })
}
