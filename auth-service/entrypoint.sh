set -e

HASHFILE=".package_hash"
NEWHASH=$(sha256sum package.json | cut -d' ' -f1)

if [ ! -f $HASHFILE ] || [ "$NEWHASH" != "$(cat $HASHFILE)" ]; then
  echo "package.json changed, running npm ci..."
  npm ci
  echo $NEWHASH > $HASHFILE
fi

exec "$@"
