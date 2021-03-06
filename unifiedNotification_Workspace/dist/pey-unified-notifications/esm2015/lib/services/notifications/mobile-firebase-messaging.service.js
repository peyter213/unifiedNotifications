/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
// declare var FirebasePlugin;
import { Firebase } from '@ionic-native/firebase/ngx';
import { takeWhile } from 'rxjs/operators';
import * as i0 from "@angular/core";
import * as i1 from "@ionic-native/firebase/ngx/index";
export class MobileFirebaseMessagingService {
    /**
     * @param {?} firebase
     */
    constructor(firebase) {
        this.firebase = firebase;
        this.permission = new BehaviorSubject(null);
        this.token = new BehaviorSubject(null);
        this.currentMessage = new BehaviorSubject(null);
        this.isAlive = true;
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this.isAlive = false;
    }
    /**
     * @return {?}
     */
    init() {
        this.getToken();
        this.initNotifications();
    }
    /**
     * @return {?}
     */
    getToken() {
        this.firebase.getToken()
            .then((/**
         * @param {?} token
         * @return {?}
         */
        token => {
            this.token.next(token);
        }))
            .catch((/**
         * @param {?} err
         * @return {?}
         */
        err => console.log(err)));
        this.firebase.onTokenRefresh()
            .pipe(takeWhile((/**
         * @return {?}
         */
        () => this.isAlive)))
            .subscribe((/**
         * @param {?} x
         * @return {?}
         */
        x => {
            //posts on update
            if (x) {
                if (x !== this.token) {
                    this.token.next(x);
                }
            }
        }));
    }
    /**
     * @return {?}
     */
    initNotifications() {
        this.firebase.onNotificationOpen()
            .pipe(takeWhile((/**
         * @return {?}
         */
        () => this.isAlive)))
            .subscribe((/**
         * @param {?} notification
         * @return {?}
         */
        notification => {
            this.currentMessage.next(notification);
        }));
    }
    /**
     * @param {?} id
     * @return {?}
     */
    joinGroup(id) {
        console.log('subscribe to group' + id);
        this.firebase.subscribe(id);
    }
    /**
     * @param {?} id
     * @return {?}
     */
    leaveGroup(id) {
        console.log('unsubscribe to group' + id);
        this.firebase.unsubscribe(id);
    }
    /**
     * @return {?}
     */
    updatePermission() {
        this.firebase.grantPermission()
            .then((/**
         * @param {?} permission
         * @return {?}
         */
        permission => {
            this.permission.next(permission);
        }))
            .catch((/**
         * @param {?} err
         * @return {?}
         */
        err => console.log(err)));
        this.firebase.hasPermission()
            .then((/**
         * @param {?} perm
         * @return {?}
         */
        perm => {
        }))
            .catch((/**
         * @param {?} err
         * @return {?}
         */
        err => console.log(err)));
    }
    /**
     * @return {?}
     */
    hasPermission() {
        return this.firebase.hasPermission()
            .then((/**
         * @param {?} perm
         * @return {?}
         */
        perm => {
            return perm.isEnabled;
        }));
    }
}
MobileFirebaseMessagingService.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root'
            },] }
];
/** @nocollapse */
MobileFirebaseMessagingService.ctorParameters = () => [
    { type: Firebase }
];
/** @nocollapse */ MobileFirebaseMessagingService.ngInjectableDef = i0.defineInjectable({ factory: function MobileFirebaseMessagingService_Factory() { return new MobileFirebaseMessagingService(i0.inject(i1.Firebase)); }, token: MobileFirebaseMessagingService, providedIn: "root" });
if (false) {
    /** @type {?} */
    MobileFirebaseMessagingService.prototype.permission;
    /** @type {?} */
    MobileFirebaseMessagingService.prototype.token;
    /** @type {?} */
    MobileFirebaseMessagingService.prototype.currentMessage;
    /** @type {?} */
    MobileFirebaseMessagingService.prototype.isAlive;
    /**
     * @type {?}
     * @private
     */
    MobileFirebaseMessagingService.prototype.firebase;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9iaWxlLWZpcmViYXNlLW1lc3NhZ2luZy5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vcGV5LXVuaWZpZWQtbm90aWZpY2F0aW9ucy8iLCJzb3VyY2VzIjpbImxpYi9zZXJ2aWNlcy9ub3RpZmljYXRpb25zL21vYmlsZS1maXJlYmFzZS1tZXNzYWdpbmcuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBYSxNQUFNLGVBQWUsQ0FBQztBQUN0RCxPQUFPLEVBQUUsZUFBZSxFQUFXLE1BQU0sTUFBTSxDQUFDOztBQUdoRCxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sNEJBQTRCLENBQUM7QUFDdEQsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLGdCQUFnQixDQUFDOzs7QUFNM0MsTUFBTSxPQUFPLDhCQUE4Qjs7OztJQVN6QyxZQUNVLFFBQWtCO1FBQWxCLGFBQVEsR0FBUixRQUFRLENBQVU7UUFSNUIsZUFBVSxHQUFHLElBQUksZUFBZSxDQUFVLElBQUksQ0FBQyxDQUFDO1FBQ2hELFVBQUssR0FBRyxJQUFJLGVBQWUsQ0FBUyxJQUFJLENBQUMsQ0FBQztRQUUxQyxtQkFBYyxHQUFHLElBQUksZUFBZSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBRTNDLFlBQU8sR0FBRyxJQUFJLENBQUM7SUFJWCxDQUFDOzs7O0lBRUwsV0FBVztRQUNULElBQUksQ0FBQyxPQUFPLEdBQUcsS0FBSyxDQUFDO0lBQ3ZCLENBQUM7Ozs7SUFDRCxJQUFJO1FBQ0YsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDO1FBQ2hCLElBQUksQ0FBQyxpQkFBaUIsRUFBRSxDQUFDO0lBQzNCLENBQUM7Ozs7SUFDRCxRQUFRO1FBQ04sSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLEVBQUU7YUFDbkIsSUFBSTs7OztRQUFFLEtBQUssQ0FBQyxFQUFFO1lBQ2IsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDekIsQ0FBQyxFQUFDO2FBQ0QsS0FBSzs7OztRQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsRUFBQyxDQUFDO1FBRXBDLElBQUksQ0FBQyxRQUFRLENBQUMsY0FBYyxFQUFFO2FBQzNCLElBQUksQ0FBQyxTQUFTOzs7UUFBQyxHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFDLENBQUM7YUFDbkMsU0FBUzs7OztRQUFFLENBQUMsQ0FBQyxFQUFFO1lBQ2QsaUJBQWlCO1lBQ2pCLElBQUcsQ0FBQyxFQUFFO2dCQUNKLElBQUcsQ0FBQyxLQUFLLElBQUksQ0FBQyxLQUFLLEVBQUU7b0JBQ25CLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO2lCQUNwQjthQUNGO1FBQ0gsQ0FBQyxFQUFDLENBQUM7SUFDUCxDQUFDOzs7O0lBQ0QsaUJBQWlCO1FBQ2YsSUFBSSxDQUFDLFFBQVEsQ0FBQyxrQkFBa0IsRUFBRTthQUMvQixJQUFJLENBQUMsU0FBUzs7O1FBQUMsR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBQyxDQUFDO2FBQ25DLFNBQVM7Ozs7UUFBRSxZQUFZLENBQUMsRUFBRTtZQUN2QixJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQztRQUMzQyxDQUFDLEVBQUMsQ0FBQztJQUNQLENBQUM7Ozs7O0lBQ0QsU0FBUyxDQUFDLEVBQVU7UUFDbEIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxvQkFBb0IsR0FBRyxFQUFFLENBQUMsQ0FBQztRQUN2QyxJQUFJLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxFQUFFLENBQUMsQ0FBQztJQUM5QixDQUFDOzs7OztJQUNELFVBQVUsQ0FBQyxFQUFVO1FBQ25CLE9BQU8sQ0FBQyxHQUFHLENBQUMsc0JBQXNCLEdBQUcsRUFBRSxDQUFDLENBQUM7UUFDekMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxXQUFXLENBQUMsRUFBRSxDQUFDLENBQUM7SUFDaEMsQ0FBQzs7OztJQUNELGdCQUFnQjtRQUNkLElBQUksQ0FBQyxRQUFRLENBQUMsZUFBZSxFQUFFO2FBQzVCLElBQUk7Ozs7UUFBQyxVQUFVLENBQUMsRUFBRTtZQUNqQixJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUNuQyxDQUFDLEVBQUM7YUFDRCxLQUFLOzs7O1FBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxFQUFDLENBQUM7UUFDbEMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxhQUFhLEVBQUU7YUFDMUIsSUFBSTs7OztRQUFDLElBQUksQ0FBQyxFQUFFO1FBQ2IsQ0FBQyxFQUFDO2FBQ0QsS0FBSzs7OztRQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsRUFBQyxDQUFDO0lBQ3BDLENBQUM7Ozs7SUFDRCxhQUFhO1FBQ1gsT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDLGFBQWEsRUFBRTthQUN6QixJQUFJOzs7O1FBQUMsSUFBSSxDQUFDLEVBQUU7WUFDWCxPQUFPLElBQUksQ0FBQyxTQUFTLENBQUM7UUFDeEIsQ0FBQyxFQUFDLENBQUM7SUFDZixDQUFDOzs7WUF4RUYsVUFBVSxTQUFDO2dCQUNWLFVBQVUsRUFBRSxNQUFNO2FBQ25COzs7O1lBTlEsUUFBUTs7Ozs7SUFTZixvREFBZ0Q7O0lBQ2hELCtDQUEwQzs7SUFFMUMsd0RBQTJDOztJQUUzQyxpREFBZTs7Ozs7SUFHYixrREFBMEIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlLCBPbkRlc3Ryb3kgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgQmVoYXZpb3JTdWJqZWN0LCBTdWJqZWN0IH0gZnJvbSAncnhqcyc7XHJcblxyXG4vLyBkZWNsYXJlIHZhciBGaXJlYmFzZVBsdWdpbjtcclxuaW1wb3J0IHsgRmlyZWJhc2UgfSBmcm9tICdAaW9uaWMtbmF0aXZlL2ZpcmViYXNlL25neCc7XHJcbmltcG9ydCB7IHRha2VXaGlsZSB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcclxuXHJcblxyXG5ASW5qZWN0YWJsZSh7XHJcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBNb2JpbGVGaXJlYmFzZU1lc3NhZ2luZ1NlcnZpY2UgaW1wbGVtZW50cyBPbkRlc3Ryb3kge1xyXG5cclxuICBwZXJtaXNzaW9uID0gbmV3IEJlaGF2aW9yU3ViamVjdDxib29sZWFuPihudWxsKTtcclxuICB0b2tlbiA9IG5ldyBCZWhhdmlvclN1YmplY3Q8c3RyaW5nPihudWxsKTtcclxuXHJcbiAgY3VycmVudE1lc3NhZ2UgPSBuZXcgQmVoYXZpb3JTdWJqZWN0KG51bGwpO1xyXG5cclxuICBpc0FsaXZlID0gdHJ1ZTtcclxuXHJcbiAgY29uc3RydWN0b3IoXHJcbiAgICBwcml2YXRlIGZpcmViYXNlOiBGaXJlYmFzZVxyXG4gICkgeyB9XHJcblxyXG4gIG5nT25EZXN0cm95KCkge1xyXG4gICAgdGhpcy5pc0FsaXZlID0gZmFsc2U7XHJcbiAgfVxyXG4gIGluaXQoKSB7XHJcbiAgICB0aGlzLmdldFRva2VuKCk7XHJcbiAgICB0aGlzLmluaXROb3RpZmljYXRpb25zKCk7XHJcbiAgfVxyXG4gIGdldFRva2VuKCkgeyBcclxuICAgIHRoaXMuZmlyZWJhc2UuZ2V0VG9rZW4oKVxyXG4gICAgICAgIC50aGVuKCB0b2tlbiA9PiB7XHJcbiAgICAgICAgICB0aGlzLnRva2VuLm5leHQodG9rZW4pO1xyXG4gICAgICAgIH0pXHJcbiAgICAgICAgLmNhdGNoKGVyciA9PiBjb25zb2xlLmxvZyhlcnIpKTtcclxuXHJcbiAgICB0aGlzLmZpcmViYXNlLm9uVG9rZW5SZWZyZXNoKClcclxuICAgICAgLnBpcGUodGFrZVdoaWxlKCgpID0+IHRoaXMuaXNBbGl2ZSkpXHJcbiAgICAgIC5zdWJzY3JpYmUoIHggPT4ge1xyXG4gICAgICAgIC8vcG9zdHMgb24gdXBkYXRlXHJcbiAgICAgICAgaWYoeCkge1xyXG4gICAgICAgICAgaWYoeCAhPT0gdGhpcy50b2tlbikge1xyXG4gICAgICAgICAgICB0aGlzLnRva2VuLm5leHQoeCk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICB9KTtcclxuICB9XHJcbiAgaW5pdE5vdGlmaWNhdGlvbnMoKSB7IFxyXG4gICAgdGhpcy5maXJlYmFzZS5vbk5vdGlmaWNhdGlvbk9wZW4oKVxyXG4gICAgICAucGlwZSh0YWtlV2hpbGUoKCkgPT4gdGhpcy5pc0FsaXZlKSlcclxuICAgICAgLnN1YnNjcmliZSggbm90aWZpY2F0aW9uID0+IHtcclxuICAgICAgICAgIHRoaXMuY3VycmVudE1lc3NhZ2UubmV4dChub3RpZmljYXRpb24pO1xyXG4gICAgICB9KTtcclxuICB9XHJcbiAgam9pbkdyb3VwKGlkOiBzdHJpbmcpIHtcclxuICAgIGNvbnNvbGUubG9nKCdzdWJzY3JpYmUgdG8gZ3JvdXAnICsgaWQpO1xyXG4gICAgdGhpcy5maXJlYmFzZS5zdWJzY3JpYmUoaWQpO1xyXG4gIH1cclxuICBsZWF2ZUdyb3VwKGlkOiBzdHJpbmcpIHtcclxuICAgIGNvbnNvbGUubG9nKCd1bnN1YnNjcmliZSB0byBncm91cCcgKyBpZCk7XHJcbiAgICB0aGlzLmZpcmViYXNlLnVuc3Vic2NyaWJlKGlkKTtcclxuICB9XHJcbiAgdXBkYXRlUGVybWlzc2lvbigpIHtcclxuICAgIHRoaXMuZmlyZWJhc2UuZ3JhbnRQZXJtaXNzaW9uKClcclxuICAgICAgLnRoZW4ocGVybWlzc2lvbiA9PiB7XHJcbiAgICAgICAgdGhpcy5wZXJtaXNzaW9uLm5leHQocGVybWlzc2lvbik7XHJcbiAgICAgIH0pXHJcbiAgICAgIC5jYXRjaChlcnIgPT4gY29uc29sZS5sb2coZXJyKSk7XHJcbiAgICB0aGlzLmZpcmViYXNlLmhhc1Blcm1pc3Npb24oKVxyXG4gICAgICAudGhlbihwZXJtID0+ICB7XHJcbiAgICAgIH0pXHJcbiAgICAgIC5jYXRjaChlcnIgPT4gY29uc29sZS5sb2coZXJyKSk7XHJcbiAgfVxyXG4gIGhhc1Blcm1pc3Npb24oKTogUHJvbWlzZTxib29sZWFuPiB7XHJcbiAgICByZXR1cm4gdGhpcy5maXJlYmFzZS5oYXNQZXJtaXNzaW9uKClcclxuICAgICAgICAgICAgICAudGhlbihwZXJtID0+IHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBwZXJtLmlzRW5hYmxlZDtcclxuICAgICAgICAgICAgICB9KTtcclxuICB9XHJcbn0iXX0=