---
exact: true
includes: []
---
resource "aws_instance" "example" {
  user_data = jsonencode({
    Version = "2012-10-17"
    packages = ["nginx"]
    $0
  })
}
