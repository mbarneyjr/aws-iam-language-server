---
code: DUPLICATE_KEY
count: 0
---
statement {
  effect    = "Allow"
  actions   = ["s3:GetObject"]
  resources = ["*"]

  condition {
    test     = "StringEquals"
    variable = "aws:PrincipalTag/department"
    values   = ["eng"]
  }

  condition {
    test     = "StringEquals"
    variable = "aws:PrincipalTag/team"
    values   = ["platform"]
  }
}
