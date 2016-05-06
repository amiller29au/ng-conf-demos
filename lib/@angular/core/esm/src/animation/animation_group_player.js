import { isPresent, scheduleMicroTask } from '../facade/lang';
export class AnimationGroupPlayer {
    constructor(_players) {
        this._players = _players;
        this._subscriptions = [];
        this.parentPlayer = null;
        var count = 0;
        var total = this._players.length;
        if (total == 0) {
            scheduleMicroTask(() => this._onFinish());
        }
        else {
            this._players.forEach(player => {
                player.parentPlayer = this;
                player.onDone(() => {
                    if (++count >= total) {
                        this._onFinish();
                    }
                });
            });
        }
    }
    _onFinish() {
        if (!isPresent(this.parentPlayer)) {
            this.destroy();
        }
        this._subscriptions.forEach(subscription => subscription());
        this._subscriptions = [];
    }
    onDone(fn) { this._subscriptions.push(fn); }
    play() { this._players.forEach(player => player.play()); }
    pause() { this._players.forEach(player => player.pause()); }
    restart() { this._players.forEach(player => player.restart()); }
    finish() { this._players.forEach(player => player.finish()); }
    destroy() { this._players.forEach(player => player.destroy()); }
    reset() { this._players.forEach(player => player.reset()); }
}
//# sourceMappingURL=animation_group_player.js.map