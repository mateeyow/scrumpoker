# SCRUM Poker

## PREREQUISITES
- [Air](https://github.com/cosmtrek/air) - for development
- NodeJS
- Golang
- MongoDB

## Development

### Running the server

```bash
  go mod vendor
  make ss
```

### Running the client

```bash
  pushd client
  yarn
  popd client
  make sc
```

TODO:
  - [ ] Deploy to production
  - [ ] Fix UI/UX
  - [ ] Add ability to connecto to JIRA
  - [ ] Add some metrics for SCRUM master