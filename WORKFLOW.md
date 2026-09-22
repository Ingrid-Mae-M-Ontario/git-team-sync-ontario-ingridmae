# WORKFLOW.md

 1. What did the rejected push error message tell you, and why did it happen?

Git rejected the push with `! [rejected] feature/loyalty-points -> feature/loyalty-points (fetch first)`,
along with a hint that "the remote contains work that you do not have locally." This happened twice:
first when Clone B committed a change to `calculateLoyaltyPoints` without knowing Clone A had already
pushed a different change to the same branch, and again later when Clone A made a new change without
fetching Clone B's merge first. In both cases, the local branch was based on an older version of
`feature/loyalty-points` than what was actually on GitHub, so Git refused to overwrite history it
didn't know about.

 2. What's the actual difference between how you resolved Task 3 (merge) vs Task 4 (rebase)?

In Task 3, `git merge` created a new merge commit (`b31eae4`) with two parents, preserving the exact
shape of how the two branches diverged and rejoined — you can see the fork and merge clearly in
`git log --graph`. In Task 4, `git rebase` instead rewrote my new commit so it applied cleanly on top
of the latest version of `feature/loyalty-points`, producing a single linear commit (`11f6b93`) with
no merge commit at all. The merge preserves true history including the divergence; the rebase rewrites
history to look like the work happened sequentially, one commit after another.

 3. What one habit would have avoided both rejected pushes in this lab?

Running `git fetch` (or `git pull`) before starting new work on a shared branch. Both rejections
happened because a clone started editing and committing without first checking whether the remote
branch had moved since the last time it synced.

 4. Which approach - merge or rebase - would you default to on a shared team branch, and why?

I'd default to merge for a branch that's already been pushed and possibly pulled by teammates, since
rebasing rewrites commit history and can cause serious problems if someone else has already based work
on the commits being rewritten. I'd only use rebase on my own local, not-yet-pushed commits to keep my
own history clean before sharing it. Once work is public on a shared branch, merge is the safer default.