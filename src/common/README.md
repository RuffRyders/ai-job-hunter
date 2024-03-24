# Please migrate to common and features

With growing the functionality to add a Job Tracker, things were starting to get unweildy, `components` was getting to crazy. To better organize files, I have moved a lot of stuff around. (sorry)

I created the `src/features/[myFeature]` and `src/common` directories to split code into feature spaces and a common space. Under each of these directories, I propose having `/ui`, `/data`, `/utils`, `/services`, etc. sub-directories.

This makes it possible to move, rename, group together and ultimately remove a feature without having to perform major surgury on the codebase at a later time.

For example, I've created a `src/features/jobTracker` and `src/features/bot` directory. Similarly, we can have a `src/features/auth` to contain all the important Auth logic.
