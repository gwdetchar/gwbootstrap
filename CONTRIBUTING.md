# Contributing to GW-Bootstrap

## Git workflow

This is [@alurban](//github.com/alurban/)'s preferred workflow, which may work
well for others. It is essentially a verbose version of the
[GitHub flow](https://guides.github.com/introduction/flow/) model.
The basic idea is to fork `gwbootstrap`, use the `master` branch of your fork
as a way of keeping your fork current with other people's changes that have
been merged into the main repo, and then base pull requests on a dedicated
_feature branch_ for each new contribution:

- Fork `gwbootstrap` (if needed) by clicking _Fork_ in the upper-right corner
  of https://github.com/gwdetchar/gwbootstrap/. This step only needs to be done
  once, ever.

- Clone your fork into a new folder on your local computer, ideally one
  dedicated for pull requests to the repository (replace `<username>` with
  your GitHub username):

  ```bash
  git clone https://github.com/<username>/gwbootstrap.git
  cd gwbootstrap
  ```

- **Note:** you can freely change the name of the folder you clone into as
  appropriate, e.g. `git clone <repository-URL> <folder-name>`.
  
- Link your fork to the upstream "main" repo:

  ```bash
  git remote add upstream https://github.com/gwdetchar/gwbootstrap.git
  ```
  
- Pull down any changes from the upstream "main" repo onto your fork's master
  branch, in order to pick up other people's changes, then push to your remote
  to update your fork on GitHub:

  ```bash
  git pull --rebase upstream master
  git push
  ```

- Create a dedicated branch for your work:

  ```bash
  git checkout -b my-new-branch
  ```
  
- Make all the necessary commits to this branch.

- Push changes to your remote on GitHub:

  ```bash
  git push -u origin my-new-branch
  ```

- This action will provide a link you can use to open a merge request on
  GitHub. Please provide a brief but descriptive title and a description
  of the changes you're trying to make, with enough context that the package
  librarians can understand and review your work.

- When the request is merged, you should 'delete the source branch' (there's
  a button on GitHub) in order to keep your fork clean. You should also `git
  pull` on your fork's `master` branch to keep it up-to-date.

And that's it!

## Coding guidelines

### Browser compatibility

**GW-Bootstrap code must remain compatible with all modern browsers.**

Please be sure to include vendor-specific keys and attributes where
appropriate, and test your output with multiple browsers (especially
Chrome, Firefox, Safari, and/or IE9+) if possible.

### Testing changes

In order to make sure your proposed changes do what you expect them to do,
please test them in a live environment with living HTML. You can install your
changes locally via the [Node Package Manager](https://www.npmjs.com/get-npm)
(`npm`):

```bash
npm install .
```

Conveniently, this will also install dependencies, including those needed for
development and testing.

### Style

Stylesheets in this collection follow [Sass Guidelines](https://sass-guidelin.es),
and all code should adhere to these as far as is reasonable.

Automated testing of pull requests includes a job that runs the
[`stylelint`](https://stylelint.io) linter, which checks the style of SCSS
sheets in the repo, and [`eslint`](https://eslint.org), which checks
JavaScript tools. You can run these locally before committing changes via:

```bash
npm run lint
```
Make sure to run these commands from the top-level directory, which contains
a configuration for the SCSS and JS linters.

### Compiling minified scripts

Finally, please make sure to compile your changes into "minified" stylesheets
and scripts, so that webpages using these elements can load them quickly and
efficiently:

```bash
npm run build
```

This will run the local [`build.sh`](scripts/build.sh) script, which automates
all necessary compiling for your convenience. Note, build tests will fail if
the minified files are not re-compiled, and you will need to commit them once
they've been updated.
