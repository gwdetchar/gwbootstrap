# Contributing to GW-Bootstrap

This is [@duncanmmacleod](//github.com/duncanmmacleod/)'s workflow, which might work well for others, it is just a verbose version of the [GitHub flow](https://guides.github.com/introduction/flow/).
The basic idea is to use the `master` branch of your fork as a way of updating your fork with other people's changes that have been merged into the main repo, and then  working on a dedicated _feature branch_ for each piece of work:

- create the fork (if needed) by clicking _Fork_ in the upper-right corner of https://github.com/gwdetchar/gwbootstrap/ - this only needs to be done once, ever
- clone the fork into a new folder dedicated for this piece of work (replace `<username>` with yout GitHub username):

  ```bash
  git clone https://github.com/<username>/gwbootstrap.git gwbootstrap-my-work  # change gwbootstrap-my-work as appropriate
  cd gwbootstrap-my-work
  ```
  
- link the fork to the upstream 'main' repo:

  ```bash
  git remote add upstream https://github.com/gwdetchar/gwbootstrap.git
  ```
  
- pull changes from the upstream 'main' repo onto your fork's master branch to pick up other people's changes, then push to your remote to update your fork on github.com

  ```bash
  git pull --rebase upstream master
  git push
  ```

- create a new branch on which to work

  ```bash
  git checkout -b my-new-branch
  ```
  
- make commits to that branch
- push changes to your remote on github.com

  ```bash
  git push -u origin my-new-branch
  ```

- open a merge request on github.com
- when the request is merged, you should 'delete the source branch' (there's a button), then just delete the clone of your fork and forget about it

 ```bash
  cd ../
  rm -rf ./gwbootstrap-my-work
  ```

And that's it.

## Coding guidelines

### Browser compatibility

**GW-Bootstrap code must remain compatible with all modern browsers.**

Please be sure to include vendor-specific keys and attributes where
appropriate, and test your output with multiple browsers (especially
Chrome, Firefox, Safari, and/or IE9+) if possible.

### Style

Stylesheets in this collection follow [Sass Guidelines](https://sass-guidelin.es),
and all code should adhere to these as far as is reasonable.

Automated testing of pull requests includes a job that runs the
[`stylelint`](https://stylelint.io) linter, which checks the style of SCSS
sheets in the repo, and [`eslint`](https://eslint.org), which checks
JavaScript tools. You can run these locally before committing changes via:

```bash
npm install -g eslint stylelint stylelint-config-sass-guidelines
npx install-peerdeps --dev eslint-config-airbnb
stylelint sass/*.scss
eslint js/*.js
```
Make sure to run these commands from the top-level directory, which contains
a configuration for the SCSS and JS linters.

### Compiling minified scripts

Finally, please make sure to compile your changes into "minified" stylesheets
and scripts, so that webpages using these elements can load them quickly and
efficiently:

```bash
npm install -g sass babel-cli
npm run build
```

This will run the local [`build.sh`](build.sh) script, which automates all
necessary compiling for your convenience.
