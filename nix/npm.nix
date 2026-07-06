{
  lib,
  buildNpmPackage,
}:

buildNpmPackage {
  pname = "aws-iam-language-server";
  version = "0.0.0";
  src = ./..;
  npmDepsHash = "sha256-ATVYvN/E0Qp1Zu7Cz8vUhMM6Fec2lrgk0b7+mA2wuGE=";
  doCheck = true;
  checkPhase = ''
    npm test
  '';
  meta = {
    description = "AWS IAM Policy Language Server";
    mainProgram = "aws-iam-language-server";
    homepage = "https://github.com/mbarneyjr/aws-iam-language-server";
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
