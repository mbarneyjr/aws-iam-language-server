{
  lib,
  buildNpmPackage,
}:

buildNpmPackage {
  pname = "aws-iam-ls";
  version = "0.0.0";
  src = ./..;
  npmDepsHash = "sha256-+Q+XaeW6Sfqt48NzDNWfKN8wIJO+dp5EMku+JUt8Ns8=";
  meta = {
    description = "AWS IAM Policy Language Server";
    mainProgram = "aws-iam-ls";
    homepage = "https://github.com/mbarneyjr/aws-iam-ls";
    license = lib.licenses.mit;
    platforms = [
      "x86_64-linux"
      "aarch64-linux"
      "x86_64-darwin"
      "aarch64-darwin"
    ];
    maintainers = with lib.maintainers; [
      mbarneyjr
    ];
  };
}
