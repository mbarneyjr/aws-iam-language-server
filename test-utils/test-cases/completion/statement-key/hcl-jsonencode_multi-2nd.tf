---
exact: true
includes:
  - Sid
  - Action
  - NotAction
  - Resource
  - NotResource
  - Condition
  - Principal
  - NotPrincipal
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
        Effect = "Allow"
        $0
      }
    ]
  })
}
