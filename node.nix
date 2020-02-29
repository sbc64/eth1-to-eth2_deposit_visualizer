with import <nixpkgs> { };

stdenv.mkDerivation {
  name = "node";
  buildInputs = [ nodejs-12_x yarn ];
  shellHook = ''
    export PATH="$PWD/node_modules/.bin/:$PATH"
    npm config set cache-min 9999999
    echo "Command yarn by default uses local Nexus proxy ~ use yarn-remote to use remote registry"
    registry-remote
  '';
}
