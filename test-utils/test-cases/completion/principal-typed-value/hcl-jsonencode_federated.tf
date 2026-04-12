---
includes:
  - "cognito-identity.amazonaws.com"
  - "accounts.google.com"
  - "arn:${Partition}:iam::${Account}:saml-provider/${SamlProviderName}"
excludes:
  - "lambda.amazonaws.com"
  - "*"
---
resource "aws_iam_role" "example" {
  assume_role_policy = jsonencode({
    Version   = "2012-10-17"
    Statement = [
      {
        Effect    = "Allow"
        Action    = "sts:AssumeRole"
        Principal = {
          Federated = ["$0"]
        }
      }
    ]
  })
}
