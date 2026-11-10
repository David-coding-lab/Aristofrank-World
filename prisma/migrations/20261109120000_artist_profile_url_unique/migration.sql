-- Enforce unique artist profile URLs. `getArtistByProfileUrl` relies on this
-- column being unique for its `findUnique` lookup, and the content_models
-- migration created it without the constraint.
CREATE UNIQUE INDEX "Artist_profileUrl_key" ON "Artist"("profileUrl");
