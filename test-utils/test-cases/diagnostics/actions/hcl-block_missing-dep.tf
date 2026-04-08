---
code: DEPENDENT_ACTION
includes:
  - iam:CreateServiceLinkedRole
---
data "aws_iam_policy_document" "example" {
  statement {
    effect = "Allow"
    actions = ["access-analyzer:CreateAnalyzer"]
    resources = ["*"]
  }
}
