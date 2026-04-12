---
exact: true
includes:
  - Sid
  - Principal
  - NotPrincipal
  - Condition
---
resource "aws_iam_policy" "example" {
  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Effect   = "Deny"
        Action   = "*"
        Resource = "*"
      },
      {
        Effect   = "Allow"
        Action   = ["s3:GetObject"]
        Resource = "*"
        $0
      }
    ]
  })
}
