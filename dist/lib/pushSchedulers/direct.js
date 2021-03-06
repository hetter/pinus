"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const utils = require("../util/utils");
class DirectPushScheduler {
    start() {
        return __awaiter(this, void 0, void 0, function* () {
        });
    }
    stop() {
        return __awaiter(this, void 0, void 0, function* () {
        });
    }
    constructor(app, opts) {
        opts = opts || {};
        this.app = app;
    }
    ;
    schedule(reqId, route, msg, recvs, opts, cb) {
        opts = opts || {};
        if (opts.type === 'broadcast') {
            doBroadcast(this, msg, opts.userOptions);
        }
        else {
            doBatchPush(this, msg, recvs);
        }
        if (cb) {
            process.nextTick(function () {
                utils.invokeCallback(cb);
            });
        }
    }
    ;
}
exports.DirectPushScheduler = DirectPushScheduler;
var doBroadcast = function (self, msg, opts) {
    var channelService = self.app.get('channelService');
    var sessionService = self.app.get('sessionService');
    if (opts.binded) {
        sessionService.forEachBindedSession(function (session) {
            if (channelService.broadcastFilter &&
                !channelService.broadcastFilter(session, msg, opts.filterParam)) {
                return;
            }
            sessionService.sendMessageByUid(session.uid, msg);
        });
    }
    else {
        sessionService.forEachSession(function (session) {
            if (channelService.broadcastFilter &&
                !channelService.broadcastFilter(session, msg, opts.filterParam)) {
                return;
            }
            sessionService.sendMessage(session.id, msg);
        });
    }
};
var doBatchPush = function (self, msg, recvs) {
    var sessionService = self.app.get('sessionService');
    for (var i = 0, l = recvs.length; i < l; i++) {
        sessionService.sendMessage(recvs[i], msg);
    }
};
//# sourceMappingURL=direct.js.map