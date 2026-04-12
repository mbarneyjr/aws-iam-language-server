---
exact: true
includes:
  - Allow
  - Deny
---
resource "aws_iam_policy" "example" {
  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [{
      Effect = "$0"
    }]
  })
}
