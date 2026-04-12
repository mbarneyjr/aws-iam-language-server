---
exact: true
includes:
  - Sid
  - Principal
  - NotPrincipal
  - Action
  - NotAction
  - Resource
  - NotResource
  - Condition
---
resource "aws_iam_policy" "x" {
policy = jsonencode({Version = "2012-10-17"
Statement = [{Effect = "Allow"
$0
}]})
}
