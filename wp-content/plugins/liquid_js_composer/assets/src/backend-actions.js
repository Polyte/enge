/*!
 * WPBakery Page Builder v6.0.0 (https://wpbakery.com)
 * Copyright 2011-2020 Michael M, WPBakery
 * License: Commercial. More details: http://go.wpbakery.com/licensing
 */

// jscs:disable
// jshint ignore: start

window.vc || (window.vc = {}),
	function () {
		var ListenerHelper = vc.events = {};
		_.extend(ListenerHelper, Backbone.Events), ListenerHelper.triggerShortcodeEvents = function (eventType, shortcodeModel) {
			var shortcodeTag;
			shortcodeTag = shortcodeModel.get("shortcode"), this.trigger("shortcodes", shortcodeModel, eventType), this.trigger("shortcodes:" + shortcodeTag, shortcodeModel, eventType), this.trigger("shortcodes:" + eventType, shortcodeModel), this.trigger("shortcodes:" + shortcodeTag + ":" + eventType, shortcodeModel), this.trigger("shortcodes:" + shortcodeTag + ":" + eventType + ":parent:" + shortcodeModel.get("parent_id"), shortcodeModel), this.triggerParamsEvents(eventType, shortcodeModel)
		}, ListenerHelper.triggerParamsEvents = function (eventType, shortcodeModel) {
			var shortcodeTag, params, settings;
			shortcodeTag = shortcodeModel.get("shortcode"), params = _.extend({}, shortcodeModel.get("params")), settings = vc.map[shortcodeTag], _.isArray(settings.params) && _.each(settings.params, function (paramSettings) {
				this.trigger("shortcodes:" + eventType + ":param", shortcodeModel, params[paramSettings.param_name], paramSettings), this.trigger("shortcodes:" + shortcodeTag + ":" + eventType + ":param", shortcodeModel, params[paramSettings.param_name], paramSettings), this.trigger("shortcodes:" + eventType + ":param:type:" + paramSettings.type, shortcodeModel, params[paramSettings.param_name], paramSettings), this.trigger("shortcodes:" + shortcodeTag + ":" + eventType + ":param:type:" + paramSettings.type, shortcodeModel, params[paramSettings.param_name], paramSettings), this.trigger("shortcodes:" + eventType + ":param:name:" + paramSettings.param_name, shortcodeModel, params[paramSettings.param_name], paramSettings), this.trigger("shortcodes:" + shortcodeTag + ":" + eventType + ":param:name:" + paramSettings.param_name, shortcodeModel, params[paramSettings.param_name], paramSettings)
			}, this)
		}
	}(window.jQuery),
	function ($) {
		"use strict";
		vc.AccessPolicyConstructor = function () {
			this.accessPolicy = {}, vc.events.trigger("vc:access:initialize", this)
		}, vc.AccessPolicyConstructor.prototype = {
			accessPolicy: {},
			add: function (part, grant) {
				grant = !!_.isUndefined(grant) || !!grant, this.accessPolicy[part] = grant
			},
			can: function (part) {
				return !!this.accessPolicy[part]
			}
		}, $(function () {
			vc.accessPolicy = new vc.AccessPolicyConstructor
		})
	}(window.jQuery),
	function ($) {
		"use strict";
		vc.events.on("vc:access:initialize", function (access) {
			access.add("be_editor", vc_user_access().editor("backend_editor")), access.add("fe_editor", window.vc_frontend_enabled && vc_user_access().editor("frontend_editor")), access.add("classic_editor", !vc_user_access().check("backend_editor", "disabled_ce_editor", void 0, !0)), window.vc.gridItemEditor || vc.events.trigger("vc:access:backend:ready", access)
		}), vc.events.on("vc:access:backend:ready", function (access) {
			var $buttonsContainer, front, back, gutenberg, $titleDiv, gutenbergEditor;
			gutenberg = back = front = "", $titleDiv = $("div#titlediv"), gutenbergEditor = document.getElementById("editor"), $titleDiv.length ? (access.can("fe_editor") && (front = '<a class="wpb_switch-to-front-composer" href="' + $("#wpb-edit-inline").attr("href") + '">' + window.i18nLocale.main_button_title_frontend_editor + "</a>"), access.can("classic_editor") ? access.can("be_editor") && (back = '<a class="wpb_switch-to-composer" href="javascript:;">' + window.i18nLocale.main_button_title_backend_editor + "</a>") : ($("#postdivrich").addClass("vc-disable-editor"), access.can("be_editor") && !vc_user_access().isBlockEditorIsEnabled() && _.defer(function () {
				vc.events.trigger("vc:backend_editor:show")
			})), window.wpbIsGutenberg && (gutenberg = '<a class="wpb_switch-to-gutenberg" href="' + window.wpbGutenbergEditorSWitchUrl + '">' + window.i18nLocale.main_button_title_gutenberg + "</a>"), (front || back || gutenberg) && ($buttonsContainer = $titleDiv.length ? $('<div class="composer-switch"><div class="composer-inner-switch">' + back + front + "</div>" + gutenberg + "</div>").insertAfter($titleDiv) : $('<div class="composer-switch"><div class="composer-inner-switch">' + back + front + "</div>" + gutenberg + "</div>").prependTo("#post-body-content"), access.can("classic_editor") && $buttonsContainer.find(".wpb_switch-to-composer").on("click", function (e) {
				vc.events.trigger("vc:backend_editor:switch")
			}))) : gutenbergEditor && setTimeout(function () {
				back = '<a class="wpb_switch-to-composer" href="' + window.wpbGutenbergEditorClassicSWitchUrl + '">' + window.i18nLocale.main_button_title + "</a>";
				var gutenbergEditorHeader = gutenbergEditor.querySelector(".edit-post-header-toolbar");
				gutenbergEditorHeader && ($buttonsContainer = $('<div class="composer-switch"><div class="composer-inner-switch">' + back + "</div></div>").appendTo(gutenbergEditorHeader))
			}, 1)
		})
	}(window.jQuery);