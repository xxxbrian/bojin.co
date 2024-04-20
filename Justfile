default:
    @echo "Please specify a target"

pre-commit:
    pre-commit install
    pre-commit install --hook-type commit-msg
