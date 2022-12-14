/*!
 * WPBakery Page Builder v6.0.0 (https://wpbakery.com)
 * Copyright 2011-2020 Michael M, WPBakery
 * License: Commercial. More details: http://go.wpbakery.com/licensing
 */

// jscs:disable
// jshint ignore: start

window.vc || (window.vc = {}),
	function () {
		"use strict";
		vc.templateOptions = {
			default: {
				evaluate: /<%([\s\S]+?)%>/g,
				interpolate: /<%=([\s\S]+?)%>/g,
				escape: /<%-([\s\S]+?)%>/g
			},
			custom: {
				evaluate: /<#([\s\S]+?)#>/g,
				interpolate: /\{\{\{([\s\S]+?)\}\}\}/g,
				escape: /\{\{([^\}]+?)\}\}(?!\})/g
			}
		};

		function escapeChar(match) {
			return "\\" + escapes[match]
		}
		var noMatch = /(.)^/,
			escapes = {
				"'": "'",
				"\\": "\\",
				"\r": "r",
				"\n": "n",
				"\u2028": "u2028",
				"\u2029": "u2029"
			},
			escapeRegExp = /\\|'|\r|\n|\u2028|\u2029/g;
		vc.template = function (text, settings) {
			settings = _.defaults({}, settings, vc.templateOptions.default);
			var render, matcher = RegExp([(settings.escape || noMatch).source, (settings.interpolate || noMatch).source, (settings.evaluate || noMatch).source].join("|") + "|$", "g"),
				index = 0,
				source = "__p+='";
			text.replace(matcher, function (match, escape, interpolate, evaluate, offset) {
				return source += text.slice(index, offset).replace(escapeRegExp, escapeChar), index = offset + match.length, escape ? source += "'+\n((__t=(" + escape + "))==null?'':_.escape(__t))+\n'" : interpolate ? source += "'+\n((__t=(" + interpolate + "))==null?'':__t)+\n'" : evaluate && (source += "';\n" + evaluate + "\n__p+='"), match
			}), source += "';\n", settings.variable || (source = "with(obj||{}){\n" + source + "}\n"), source = "var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};\n" + source + "return __p;\n";
			try {
				render = new Function(settings.variable || "obj", "_", source)
			} catch (e) {
				throw e.source = source, e
			}

			function template(data) {
				return render.call(this, data, _)
			}
			var argument = settings.variable || "obj";
			return template.source = "function(" + argument + "){\n" + source + "}", template
		}
	}(),
	function ($) {
		"use strict";
		_.isUndefined(window.vc) && (window.vc = {}), window.Vc_postSettingsEditor = Backbone.View.extend({
			$editor: !1,
			sel: "wpb_csseditor",
			ace_enabled: !1,
			initialize: function (sel) {
				sel && 0 < sel.length && (this.sel = sel), this.ace_enabled = !0
			},
			aceEnabled: function () {
				return this.ace_enabled && window.ace && window.ace.edit
			},
			setEditor: function (value) {
				return this.aceEnabled() ? this.setEditorAce(value) : this.setEditorTextarea(value), this.$editor
			},
			focus: function () {
				if (this.aceEnabled()) {
					this.$editor.focus();
					var count = this.$editor.session.getLength();
					this.$editor.gotoLine(count, this.$editor.session.getLine(count - 1).length)
				} else this.$editor.focus()
			},
			setEditorAce: function (value) {
				this.$editor || (this.$editor = ace.edit(this.sel), this.$editor.getSession().setMode("ace/mode/css"), this.$editor.setTheme("ace/theme/chrome")), this.$editor.setValue(value), this.$editor.clearSelection(), this.$editor.focus();
				var count = this.$editor.getSession().getLength();
				return this.$editor.gotoLine(count, this.$editor.getSession().getLine(count - 1).length), this.$editor
			},
			setEditorTextarea: function (value) {
				return this.$editor || (this.$editor = $("<textarea></textarea>").css({
					width: "100%",
					height: "100%",
					minHeight: "300px"
				}), $("#" + this.sel).empty().append(this.$editor).css({
					overflowLeft: "hidden",
					width: "100%",
					height: "100%"
				})), this.$editor.val(value), this.$editor.focus(), this.$editor.parent().css({
					overflow: "auto"
				}), this.$editor
			},
			setSize: function () {
				var height = $(window).height() - 380;
				this.aceEnabled() ? $("#" + this.sel).css({
					height: height,
					minHeight: height
				}) : (this.$editor.parent().css({
					height: height,
					minHeight: height
				}), this.$editor.css({
					height: "98%",
					width: "98%"
				}))
			},
			setSizeResizable: function () {
				var height, editorPositionTop, $editor = $("#" + this.sel);
				editorPositionTop = $editor.offset().top, height = vc.active_panel.$el.find('[data-vc-ui-element="panel-footer"]').offset().top - editorPositionTop - 70, this.aceEnabled() ? $editor.css({
					height: height,
					minHeight: height
				}) : (this.$editor.parent().css({
					height: height,
					minHeight: height
				}), this.$editor.css({
					height: "98%",
					width: "98%"
				}))
			},
			getEditor: function () {
				return this.$editor
			},
			getValue: function () {
				return this.aceEnabled() ? this.$editor.getValue() : this.$editor.val()
			}
		})
	}(window.jQuery),
	function ($) {
		"use strict";
		$(function () {
			var $form = $('[data-vc-roles="form"]');
			$('[data-vc-roles="part-state"]').on("click", function () {
				var $this = $(this);
				$this.data("vcCustomSelector", $this.find(":selected").data("vcCustomSelector") || "")
			}).on("change", function () {
				var value, part, $customBlock, $this, customSelector;
				if (part = ($this = $(this)).data("vcRolePart"), "*" === ($customBlock = $('[data-vc-role-related-part="' + part + '"]')).data("vcRolePartState")) return !1;
				value = $this.val(), customSelector = $this.data("vcCustomSelector") || "", $customBlock.data("vcRolePartState").toString() === value ? ($customBlock.addClass("vc_visible"), customSelector.length && $customBlock.find($this.data("vcCustomSelector")).prop("checked", !0)) : $customBlock.removeClass("vc_visible")
			}), $form.on("submit", function (e) {
				var $submitButton, data;
				data = {}, e && e.preventDefault && e.preventDefault(), ($submitButton = $("#submit_btn")).attr("disabled", !0), $("#vc_wp-spinner").show(), data.action = $("#vc_settings-roles-action").val(), data.vc_nonce_field = $("#vc_nonce_field").val(), data.vc_roles = {}, $("[data-vc-role]").each(function () {
					var $this = $(this),
						role = $this.data("vcRole"),
						roleData = {};
					$this.find("select").each(function () {
						var $this = $(this),
							part = $this.data("vcPart");
						void 0 === roleData[part] && (roleData[part] = {}), roleData[part][$this.data("vcName")] = $this.val()
					}), $this.find('[data-vc-role-related-part].vc_visible [data-vc-name][type="checkbox"]').each(function () {
						var $this = $(this),
							part = $this.data("vcPart");
						void 0 === roleData[part] && (roleData[part] = {}), roleData[part][$this.data("vcName")] = $this.is(":checked") ? $this.val() : "0"
					}), data.vc_roles[role] = JSON.stringify(roleData)
				}), $.ajax({
					url: $form.attr("action"),
					type: "POST",
					dataType: "json",
					data: data,
					context: this
				}).done(function (data) {
					var $messageHtml;
					$("#vc_wp-spinner").hide(), data.message && (($messageHtml = $('<div id="vc_roles-message" class="updated vc_updater-result-message hidden"><p><strong></strong></p></div>')).find("strong").text(data.message), $messageHtml.insertBefore($submitButton).fadeIn(100), window.setTimeout(function () {
						$messageHtml.slideUp(100, function () {
							$(this).remove(), $submitButton.attr("disabled", !1)
						})
					}, 2e3))
				})
			})
		}), $("[data-vc-accordion]").on("show.vc.accordion", function () {
			$(this).addClass("vc_opened")
		}).on("hide.vc.accordion", function () {
			$(this).removeClass("vc_opened")
		}), $('[data-vc-ui-element="panel-tab-control"]').on("click", function (e) {
			var filterValue, $control = $(this),
				$fieldset = $control.parents("fieldset").first(),
				filter = ".vc_wp-form-table";
			e.preventDefault(), $('[data-vc-ui-element="panel-tabs-controls"] .vc_active', $fieldset).removeClass("vc_active"), $control.parent().addClass("vc_active"), filterValue = $control.data("filter"), $fieldset.attr("data-vc-roles-filter-value", filterValue), filter += " " + filterValue, $(".vc_wp-form-table [data-vc-capability]", $fieldset).addClass("vc_hidden"), $(filter, $fieldset).removeClass("vc_hidden")
		}), $('[data-vc-roles="table-checkbox"]').on("change", function () {
			var $this = $(this);
			$this.is(":checked") ? $this.parents("tr:first").find('[data-vc-name!="' + $this.attr("data-vc-name") + '"]:checked').prop("checked", !1) : $this.parents('[data-vc-roles="table"]').first().find('[data-vc-roles-select-all-checkbox="' + $this.data("vcCap") + '"]').prop("checked", !1)
		}), $("[data-vc-roles-select-all-checkbox]").on("change", function () {
			var $this, checked, $parent, $relatedControl, value;
			checked = ($this = $(this)).is(":checked"), $relatedControl = ($parent = $this.parents('[data-vc-roles="table"]').first()).find($this.data("vcRelatedControls")), value = $this.data("vcRolesSelectAllCheckbox"), $parent.find('[data-vc-cap="' + value + '"]:visible').prop("checked", checked), $relatedControl.prop("checked", checked), checked && _.defer(function () {
				$parent.find("[data-vc-roles-select-all-checkbox!=" + value + "]:not([data-vc-cap])").prop("checked", !1), $parent.find('[data-vc-cap!="' + value + '"]:not([data-vc-roles-select-all-checkbox]):visible').prop("checked", !1)
			})
		}), $('[data-vc-role-related-part].vc_visible [data-vc-roles="table"]').each(function () {
			var $table = $(this);
			$table.find("thead [data-vc-roles-select-all-checkbox]").each(function () {
				var $this = $(this),
					value = $this.data("vcRolesSelectAllCheckbox");
				$table.find('[data-vc-cap="' + value + '"]:not(:checked)').length || ($this.prop("checked", !0), $table.find('tfoot [data-vc-roles-select-all-checkbox="' + value + '"]').prop("checked", !0))
			})
		})
	}(window.jQuery), _.isUndefined(window.vc) && (window.vc = {}), jQuery(document).ready(function ($) {
		"use strict";
		_.isUndefined(window.less) || (window.vc.less = {}, window.vc.less.options = {
			relativeUrls: !1,
			rootpath: !1
		}, window.less.options.env = vcData.debug ? "development" : "production", window.less.options.logLevel = vcData.debug ? 4 : 0, window.vc.less.generateLessFormData = function (formData, variablesData) {
			var lessData = {};
			return _.isEmpty(variablesData) || _.each(variablesData, function (value, key) {
				var object, objectValue;
				_.isString(value) ? (object = _.first(_.where(formData, {
					name: value
				})), _.isObject(object) && 0 < (objectValue = object.value).length && (lessData[key] = objectValue)) : _.isObject(value) && !_.isUndefined(value.key) && (object = _.first(_.where(formData, {
					name: value.key
				})), _.isObject(object) || _.isUndefined(value.default_key) ? _.isObject(object) || _.isUndefined(value.default) || (object = {
					value: value.default
				}) : object = _.isUndefined(lessData[value.default_key]) ? _.first(_.where(formData, {
					name: value.default_key
				})) : {
					value: lessData[value.default_key]
				}, _.isObject(object) && (objectValue = object.value, _.isUndefined(value.modify_output) || !_.isObject(value.modify_output) || _.isEmpty(value.modify_output) || _.each(value.modify_output, function (modifier) {
					_.isUndefined(modifier.plain) || !_.isObject(modifier.plain) || _.isEmpty(modifier.plain) || _.each(modifier.plain, function (data) {
						var localValue;
						localValue = data.replace("{{ value }}", objectValue), objectValue = localValue
					})
				}), objectValue && 0 < objectValue.length && (lessData[key] = objectValue)))
			}), lessData
		}, window.vc.less.fileManager = less.FileManager.prototype.extractUrlParts, window.less.FileManager.prototype.extractUrlParts = function (url, baseUrl) {
			return url += "?v=" + (window.vcData && window.vcData.version ? window.vcData.version : "4.5"), vc.less.fileManager(url, baseUrl)
		}, window.vc.less.build = function (options, callback) {
			var self;
			this.options = _.extend({}, {
				modifyVars: {},
				variablesDataLinker: {},
				lessPath: ""
			}, this.options, options), this.options.modifyVars = this.generateLessFormData(this.options.modifyVars, this.options.variablesDataLinker), self = this, _.defer(function () {
				less.render('@import "' + self.options.lessPath + '";', self.options).then(function (output) {
					callback && callback.call(self, output)
				}, function (error) {
					callback && callback.call(self, void 0, error)
				})
			})
		})
	});
var vc_am = {
	current_form: !1
};
window.i18nLocaleVcAutomapper = window.i18nLocaleSettings,
	function ($) {
		"use strict";

		function VCS4() {
			return (65536 * (1 + Math.random()) | 0).toString(16).substring(1)
		}
		var EditFormView, request_url, sync_callback;
		vc_am.vcGuid = function () {
			return VCS4() + VCS4() + "-" + VCS4()
		}, _.extend(wp.shortcode.prototype, {
			taggedString: function () {
				var text = '[<span class="vc_preview-tag">' + _.escape(this.tag) + "</span>";
				return _.each(this.attrs.numeric, function (value) {
					/\s/.test(value) ? text += ' <span class="vc_preview-param">"' + _.escape(value) + '"</span>' : text += ' <span class="vc_preview-param">' + _.escape(value) + "</span>"
				}), _.each(this.attrs.named, function (value, name) {
					text += ' <span class="vc_preview-param">' + _.escape(name) + '="' + _.escape(value) + '"</span>'
				}), "single" === this.type ? text + "]" : "self-closing" === this.type ? text + " /]" : (text += "]", this.content && (text += '<span class="vc_preview-content">' + _.escape(this.content) + "</span>"), text + '[/<span class="vc_preview-tag">' + _.escape(this.tag) + "</span>]")
			}
		}), wp.shortcode.atmPreview = function (options) {
			return new wp.shortcode(options).taggedString()
		};
		var message_timer, to_title, $vcSettings = $("#vc_settings-automapper");

		function show_message(text, type) {
			message_timer && (window.clearTimeout(message_timer), $(".vc_settings-automapper").remove(), message_timer = !1);
			var $message = $('<div class="vc_atm-message updated' + (type ? " vc_message-" + type : "") + '" style="display: none;"></div>');
			$message.text(text), $message.prependTo($vcSettings).fadeIn(500, function () {
				var $message = $(this);
				window.setTimeout(function () {
					$message.remove()
				}, 2e3)
			})
		}

		function showValidationError(text, $el) {
			!_.isUndefined($el) && $el.length || ($el = $(".tab_intro")),
				function (text, typeClass, timeout, remove) {
					remove && $(".vc_atm-message").remove();
					var $message = $('<div class="vc_atm-message ' + (typeClass || "") + '" style="display: none;"></div>');
					return $message.text(text), _.isUndefined(timeout) || window.setTimeout(function () {
						$message.remove()
					}, timeout), $message
				}(text, "error", void 0, !0).insertBefore($el).fadeIn(500)
		}
		to_title = function (string) {
			return (string = string.replace(/_|-/, " ")).charAt(0).toUpperCase() + string.slice(1)
		};
		var question = "?"; - 1 < window.ajaxurl.indexOf("?") && (question = "&"), request_url = window.ajaxurl + question + "vc_action=automapper", sync_callback = function (method, model, options) {
			var data;
			data = "create" === method ? (model.set("id", vc_am.vcGuid()), {
				vc_action: "create",
				action: "vc_automapper_create",
				data: model.toJSON()
			}) : "update" === method ? {
				vc_action: "update",
				action: "vc_automapper_update",
				id: model.get("id"),
				data: model.toJSON()
			} : "delete" === method ? {
				vc_action: "delete",
				action: "vc_automapper_delete",
				id: model.get("id")
			} : {
				vc_action: "read",
				action: "vc_automapper_read"
			}, $.ajax({
				method: "POST",
				url: request_url,
				dataType: "json",
				data: _.extend(data, {
					_vcnonce: window.vcAdminNonce
				}),
				context: this
			}).done(function (response) {
				if (response.success) {
					var data = response.data,
						result = model;
					data && "read" === method && (result = data), result ? "read" === method && options.success(result) : options.error("Not found")
				}
			}).error(function (data) {})
		};
		var ShortcodeModel = Backbone.Model.extend({
				defaults: function () {
					return {
						tag: "",
						name: "",
						category: "",
						description: "",
						params: []
					}
				},
				sync: sync_callback
			}),
			ShortcodesCollection = Backbone.Collection.extend({
				model: ShortcodeModel,
				sync: sync_callback
			});
		vc_am.shortcodes = new ShortcodesCollection;
		Backbone.View.extend({
			tagName: "li",
			className: "widget",
			events: {
				"click .vc_automapper-edit-btn": "edit",
				"click h4, widget-action": "edit",
				"click .vc_automapper-delete-btn": "clear"
			},
			template_html: $("#vc_automapper-item-tpl").html() || "<span>{{ tag }}</span>",
			initialize: function () {
				this.listenTo(this.model, "change", this.render), this.listenTo(this.model, "destroy", this.removeView)
			},
			render: function () {
				var template = vc.template(this.template_html, vc.templateOptions.custom);
				return this.$el.html(template(this.model.toJSON())).attr("data-item-id", this.model.get("id")), this
			},
			edit: function (e) {
				e && e.preventDefault && e.preventDefault(), new EditFormView({
					model: this.model
				}).render()
			},
			clear: function (e) {
				e && e.preventDefault && e.preventDefault(), confirm(window.i18nLocaleVcAutomapper.are_you_sure_delete) && this.model.destroy()
			},
			removeView: function () {
				this.$el.remove()
			}
		});
		var FormView = Backbone.View.extend({
				render: function () {
					return vc_am.current_form && vc_am.current_form.close(), vc_am.current_form = this
				},
				getType: function () {
					return "form"
				},
				validate: function (attrs) {
					var result = !1;
					if (!attrs.name) return window.i18nLocaleVcAutomapper.error_shortcode_name_is_required;
					if (!attrs.tag || !attrs.tag.match(/^\S+$/)) return window.i18nLocaleVcAutomapper.error_enter_valid_shortcode_tag;
					var fields_required = ["param_name", "heading", "type"];
					return _.each(attrs.params, function (param) {
						_.each(fields_required, function (field) {
							"" !== param[field] && ("param_name" !== field || param[field].match(/^[a-z0-9_]+$/g)) || (result = window.i18nLocaleVcAutomapper.error_enter_required_fields)
						}, this)
					}, this), result || null
				},
				isValid: function (data) {
					return this.validationError = this.validate(data), !this.validationError
				},
				close: function (e) {
					e && e.preventDefault && e.preventDefault(), vc_am.current_form = !1, this.remove()
				}
			}),
			ComplexShortcodeView = Backbone.View.extend({
				_$widget_title: !1,
				_$form_view: !1,
				edit_view: !1,
				tagName: "li",
				className: "widget",
				events: {
					"click .vc_automapper-edit-btn": "edit",
					"click h4, .widget-action": "edit"
				},
				template_html: $("#vc_automapper-item-complex-tpl").html() || "<span>{{ tag }}</span>",
				header_template_html: '<h4>{{ name }}<span class="in-widget-title"></span></h4>',
				initialize: function () {
					_.bindAll(this, "removeEditForm"), this.listenTo(this.model, "destroy", this.removeView), this.model.view = this
				},
				render: function () {
					var template = vc.template(this.template_html, vc.templateOptions.custom);
					return this.$el.html(template(this.model.toJSON())).attr("data-item-id", this.model.get("id")), this
				},
				renderTitle: function () {
					var template = vc.template(this.header_template_html, vc.templateOptions.custom);
					this.$widgetTitle().html(template(this.model.toJSON()))
				},
				edit: function (e) {
					if (e && e.preventDefault && e.preventDefault(), this.$editForm().is(":animated")) return !1;
					this.$el.addClass("vc_opened"), this.edit_view ? this.close() : this.edit_view = new EditFormInnerView({
						model: this.model
					}).render()
				},
				$widgetTitle: function () {
					return this._$widget_title || (this._$widget_title = this.$el.find(".widget-title")), this._$widget_title
				},
				$editForm: function () {
					return this._$edit_form || (this._$edit_form = this.$el.find(".widget-inside")), this._$edit_form
				},
				removeEditForm: function () {
					this.edit_view && this.edit_view.remove(), this.edit_view = !1
				},
				beforeSave: function () {
					this.$el.find("#vc_atm-name").val($("#vc_atm-header-name").val())
				},
				close: function () {
					vc_am.current_form = !1, this.$el.removeClass("vc_opened"), this.renderTitle(), this.$editForm().slideUp(200), this.removeEditForm()
				},
				clear: function (e) {
					e && e.preventDefault && e.preventDefault(), this.model.destroy()
				},
				removeView: function () {
					this.remove()
				}
			}),
			AddFormView = FormView.extend({
				className: "vc_add-form-atm",
				template_html: $("#vc_automapper-add-form-tpl").html(),
				events: {
					"click #vc_atm-parse-string": "parseShortcode",
					"click .vc_atm-cancel": "close"
				},
				getType: function () {
					return "create"
				},
				render: function () {
					AddFormView.__super__.render.call(this);
					var template = vc.template(this.template_html, vc.templateOptions.custom);
					return this.$el.html(template()), this.$el.insertAfter(".vc_automapper-toolbar"), this
				},
				shortcodesRegexp: _.memoize(function () {
					return new RegExp("\\[(\\[?)([\\w|-]+\\b)(?![\\w-])([^\\]\\/]*(?:\\/(?!\\])[^\\]\\/]*)*?)(?:(\\/)\\]|\\](?:([^\\[]*(?:\\[(?!\\/\\2\\])[^\\[]*)*)(\\[\\/\\2\\]))?)(\\]?)")
				}),
				parseShortcode: function (e) {
					e && e.preventDefault && e.preventDefault();
					var string, matches, data, attr, params = [];
					return string = $("#vc_atm-shortcode-string").val(), !_.isEmpty(string) && (matches = string.match(this.shortcodesRegexp())) ? (attr = wp.shortcode.attrs(matches[3]), _.each(attr.named, function (value, key) {
						params.push({
							param_name: key,
							type: "textfield",
							heading: to_title(key),
							description: "Example: " + value,
							value: value
						})
					}, this), matches[5] && params.push({
						param_name: "content",
						type: "textarea",
						heading: "Content",
						description: "",
						value: matches[5]
					}), data = {
						tag: matches[2],
						name: to_title(matches[2]),
						category: window.i18nLocaleVcAutomapper.my_shortcodes_category,
						params: params
					}, void(this.isValid(data) ? (vc_am.shortcodes.create(data), show_message(window.i18nLocaleVcAutomapper.new_shortcode_mapped, "success"), $(".vc_atm-message").remove(), vc_am.shortcodes.last().view.edit()) : (this.$el.addClass("form-invalid"), showValidationError(this.validationError)))) : (this.$el.addClass("form-invalid"), showValidationError(window.i18nLocaleVcAutomapper.error_enter_valid_shortcode, this.$el), !1)
				}
			}),
			EditFormInnerView = (EditFormView = FormView.extend({
				className: "vc_edit-form",
				active_preview: !1,
				events: {
					"click #vc_atm-save": "save",
					"click .vc_atm-cancel": "close",
					"click .vc_atm-delete": "clear",
					"click #vc_atm-add-param": "addParam",
					"click .vc_delete-param": "deleteParam",
					"change #vc_atm-is-container": "setContentParam",
					"keyup .vc_param-name, .vc_param-value, #vc_atm-tag": "setPreview",
					"focus #vc_atm-tag": "setTagFieldActive",
					"focus .vc_params input, .vc_params textarea": "setParamFieldActive",
					"focus .vc_param.vc_content input, .vc_param.vc_content textarea": "setContentParamFieldActive",
					"blur #vc_atm-tag, vc_param input": "unsetFieldActive",
					'change .vc_param-field [name="type"]': "changeParamType"
				},
				new: !1,
				template_html: $("#vc_automapper-form-tpl").html(),
				param_template_html: $("#vc_atm-form-param-tpl").html(),
				getType: function () {
					return "edit"
				},
				render: function () {
					EditFormView.__super__.render.call(this);
					var template = vc.template(this.template_html, vc.templateOptions.custom);
					return this.$el.html(template(this.model.toJSON())), this.$el.insertAfter($("[data-item-id=" + this.model.id + "]").hide()), this.addAllParams(), this
				},
				changeParamType: function (e) {
					var $this, $parent;
					$parent = ($this = $(e.currentTarget)).parents(".vc_fields"), "hidden" === $this.val() ? ($parent.find('[name="heading"]').attr("disabled", !0), $parent.find('[name="description"]').attr("disabled", !0)) : ($parent.find('[name="heading"]').attr("disabled", !1), $parent.find('[name="description"]').attr("disabled", !1))
				},
				setTagFieldActive: function (e) {
					this.active_preview && $(this.active_preview).removeClass("vc_active"), this.active_preview = "#vc_shortcode-preview .vc_preview-tag", $(this.active_preview).addClass("vc_active")
				},
				setParamFieldActive: function (e) {
					var index;
					index = $(e.currentTarget).parents(".vc_param:first").index(), this.active_preview && $(this.active_preview).removeClass("vc_active"), this.active_preview = "#vc_shortcode-preview .vc_preview-param:eq(" + index + ")", $(this.active_preview).addClass("vc_active")
				},
				setContentParamFieldActive: function (e) {
					this.active_preview && $(this.active_preview).removeClass("vc_active"), this.active_preview = "#vc_shortcode-preview .vc_preview-content", $(this.active_preview).addClass("vc_active")
				},
				unsetFieldActive: function (e) {
					$(this.active_preview).removeClass("vc_active"), this.active_preview = !1
				},
				escapeParam: function (value) {
					return value && value.replace(/"/g, "``")
				},
				getPreview: function (data) {
					var params = data.params,
						content = !1,
						params_to_string = {};
					return _.each(params, function (value, key) {
						"content" !== value.param_name ? params_to_string[value.param_name] = this.escapeParam(value.value) : content = value.value
					}, this), wp.shortcode.atmPreview({
						tag: data.tag,
						attrs: params_to_string,
						content: content,
						type: !1 === content ? "single" : ""
					})
				},
				setPreview: function () {
					var data = {
						params: this.getParams(),
						tag: $("#vc_atm-tag").val()
					};
					$("#vc_shortcode-preview").html(this.getPreview(data)), this.active_preview && $(this.active_preview).addClass("vc_active")
				},
				save: function (e) {
					e && e.preventDefault && e.preventDefault(), this.$el.find(".vc_error").removeClass("vc_error");
					var data = {
						tag: $("#vc_atm-tag").val(),
						name: $("#vc_atm-name").val(),
						category: $("#vc_atm-category").val(),
						description: $("#vc_atm-description").val(),
						params: this.getParams()
					};
					this.isValid(data) ? (this.model.save(data), show_message(window.i18nLocaleVcAutomapper.shortcode_updated, "success"), this.close()) : showValidationError(this.validationError, this.$el.find("#vc_atm-save"))
				},
				validate: function (attrs) {
					var result, added_param_names;
					if ($(".vc_error,.form-invalid").removeClass("vc_error form-invalid"), result = !1, added_param_names = {}, !attrs.name) return $("#vc_atm-name").addClass("vc_error"), $("#vc_atm-header-name").parent().addClass("form-invalid"), window.i18nLocaleVcAutomapper.error_shortcode_name_is_required;
					if (!attrs.tag || !attrs.tag.match(/^\S+$/)) return $("#vc_atm-tag").addClass("vc_error").parent().addClass("form-invalid"), window.i18nLocaleVcAutomapper.error_enter_valid_shortcode_tag;
					var fields_required = ["param_name", "heading", "type"];
					return _.each(attrs.params, function (param, index) {
						var $field_el = $("#vc_atm-params-list [name=param_name]:eq(" + index + ")");
						if ("content" === param.param_name && !$field_el.data("system")) return result = window.i18nLocaleVcAutomapper.error_content_param_not_manually, $field_el.addClass("vc_error"), void $field_el.closest(".vc_param-field").addClass("form-invalid");
						_.isBoolean(added_param_names[param.param_name]) && 1 == added_param_names[param.param_name] && ($field_el.addClass("vc_error"), $field_el.closest(".vc_param-field").addClass("form-invalid"), result = result || window.i18nLocaleVcAutomapper.error_param_already_exists.replace(/\%s/, param.param_name)), added_param_names[param.param_name] = !0, _.each(fields_required, function (field) {
							"hidden" !== param.type && "" === param[field] || "hidden" === param.type && "heading" !== field && "" === param[field] ? ($("#vc_atm-params-list [name=" + field + "]:eq(" + index + ")").addClass("vc_error").closest(".vc_param-field").addClass("form-invalid"), result = result || window.i18nLocaleVcAutomapper.error_enter_required_fields) : "param_name" !== field || param[field].match(/^[a-z0-9_]+$/g) || ($field_el.addClass("vc_error").closest(".vc_param-field").addClass("form-invalid"), result = result || window.i18nLocaleVcAutomapper.error_wrong_param_name)
						}, this)
					}, this), result || null
				},
				setContentParam: function (e) {
					$(e.currentTarget)[0].checked ? (this.addParamField({
						type: "textarea",
						heading: "Content",
						description: "",
						param_name: "content",
						value: ""
					}), this.setParamSorting()) : this.removeParamField("content"), this.setPreview()
				},
				addAllParams: function () {
					$("#vc_atm-params-list").empty(), _.each(this.model.get("params"), function (param) {
						this.addParamField(param), "content" === param.param_name && $("#vc_atm-is-container").prop("checked", !0)
					}, this), this.setParamSorting()
				},
				getParams: function () {
					var params = [];
					return _.each($(".vc_param"), function (param) {
						var $param = $(param);
						params.push({
							param_name: $param.find("[name=param_name]").val(),
							type: $param.find("[name=type]").val(),
							description: $param.find("[name=description]").val(),
							heading: $param.find("[name=heading]").val(),
							value: $param.find("[name=value]").val()
						})
					}, this), params
				},
				addParam: function (e) {
					e && e.preventDefault && e.preventDefault(), this.addParamField({
						type: "",
						heading: "",
						description: "",
						param_name: "",
						value: ""
					}), this.setPreview()
				},
				removeParamField: function (name) {
					$('.vc_param-name[value="' + name + '"]').parents(".vc_param").remove()
				},
				addParamField: function (attr) {
					var $block = $('<div class="vc_param wpb_vc_row' + ("content" === attr.param_name ? " vc_content" : "") + '"/>').appendTo("#vc_atm-params-list"),
						template = vc.template(this.param_template_html, vc.templateOptions.custom);
					$block.html(template(attr))
				},
				setParamSorting: function () {
					$("#vc_atm-params-list").sortable({
						items: "> .vc_param",
						tolerance: "pointer",
						handle: ".vc_move-param",
						update: this.setPreview,
						placeholder: "vc_sortable-placeholder"
					})
				},
				deleteParam: function (e) {
					e && e.preventDefault && e.preventDefault(), confirm(window.i18nLocaleVcAutomapper.are_you_sure_delete_param) && ($(e.currentTarget).parents(".vc_param").remove(), this.setPreview())
				},
				close: function (e) {
					e && e.preventDefault && e.preventDefault(), this.model && $("[data-item-id=" + this.model.get("id") + "]").show(), vc_am.current_form = !1, $(".vc_atm-message").remove(), this.remove()
				},
				clear: function (e) {
					e && e.preventDefault && e.preventDefault(), confirm(window.i18nLocaleVcAutomapper.are_you_sure_delete) && (this.model.destroy(), this.close())
				}
			})).extend({
				template_html: $("#vc_automapper-form-tpl").html(),
				getType: function () {
					return "edit"
				},
				initialize: function () {
					_.bindAll(this, "setPreview")
				},
				render: function () {
					var parent = this.model.view;
					this.model.get("params"), EditFormView.__super__.render.call(this);
					var template = vc.template(this.template_html, vc.templateOptions.custom);
					return this.$el.html(template(_.extend({
						shortcode_preview: this.getPreview(this.model.toJSON())
					}, this.model.toJSON()))), this.$el.appendTo(parent.$editForm()), parent.$widgetTitle().html('<span class="vc_atm-header"><input type="text" name="name" value="" id="vc_atm-header-name" class="vc_header-name"></span><span class="in-widget-title"></span>'), $("#vc_atm-header-name").val(this.model.get("name")), this.addAllParams(), parent.$editForm().slideDown(), this
				},
				save: function (e) {
					e && e.preventDefault && e.preventDefault(), this.model.view.beforeSave(), EditFormInnerView.__super__.save.call(this)
				},
				close: function (e) {
					e && e.preventDefault && e.preventDefault(), vc_am.current_form = !1, this.model.view.close()
				},
				clear: function (e) {
					e && e.preventDefault && e.preventDefault(), confirm(window.i18nLocaleVcAutomapper.are_you_sure_delete) && (this.model.view.clear(), this.remove())
				}
			}),
			AppView = Backbone.View.extend({
				events: {
					"click #vc_automapper-add-btn": "create",
					submit: "formSubmit"
				},
				className: "vc_atm-form",
				addFormView: !1,
				initialize: function () {
					this.listenTo(vc_am.shortcodes, "add", this.addOne), this.listenTo(vc_am.shortcodes, "reset", this.addAll), this.listenTo(vc_am.shortcodes, "all", this.render), this.$list = $(".vc_automapper-list"), vc_am.shortcodes.fetch()
				},
				formSubmit: function (e) {
					var node;
					e && e.preventDefault && e.preventDefault(), _.isObject(e) && this.addFormView && !_.isEmpty(e.currentTarget) && !_.isEmpty(e.currentTarget[0]) && (node = e.currentTarget[0], $(node).is("#vc_atm-shortcode-string") && this.addFormView.parseShortcode())
				},
				addAll: function (models) {
					models.each(function (model) {
						this.addOne(model)
					}, this)
				},
				addOne: function (model) {
					var view = new ComplexShortcodeView({
						model: model
					});
					this.$list.append(view.render().el)
				},
				create: function (e) {
					e && e.preventDefault && e.preventDefault(), vc_am.current_form && "create" === vc_am.current_form.getType() || (this.addFormView = (new AddFormView).render())
				},
				render: function () {}
			});
		$vcSettings.length && new AppView({
			el: $vcSettings
		})
	}(window.jQuery), jQuery(document).ready(function ($) {
		"use strict";

		function vc_setCookie(c_name, value, exdays) {
			var exdate = new Date;
			exdate.setDate(exdate.getDate() + exdays);
			var c_value = encodeURIComponent(value) + (null === exdays ? "" : "; expires=" + exdate.toUTCString());
			document.cookie = c_name + "=" + c_value
		}

		function vc_getCookie(c_name) {
			var i, x, y, ARRcookies = document.cookie.split(";");
			for (i = 0; i < ARRcookies.length; i++)
				if (x = ARRcookies[i].substr(0, ARRcookies[i].indexOf("=")), y = ARRcookies[i].substr(ARRcookies[i].indexOf("=") + 1), (x = x.replace(/^\s+|\s+$/g, "")) == c_name) return decodeURIComponent(y)
		}
		$(".wpb_settings_accordion").accordion({
			active: !!vc_getCookie("wpb_js_composer_settings_group_tab") && vc_getCookie("wpb_js_composer_settings_group_tab"),
			collapsible: !0,
			change: function (event, ui) {
				void 0 !== ui.newHeader.attr("id") ? vc_setCookie("wpb_js_composer_settings_group_tab", "#" + ui.newHeader.attr("id"), 31536e3) : vc_setCookie("wpb_js_composer_settings_group_tab", "", 31536e3)
			},
			heightStyle: "content"
		}), $(".wpb-settings-select-all-shortcodes").on("click", function (e) {
			e.preventDefault(), $(this).parent().parent().find("[type=checkbox]").attr("checked", !0)
		}), $(".wpb-settings-select-none-shortcodes").on("click", function (e) {
			e.preventDefault(), $(this).parent().parent().find("[type=checkbox]").removeAttr("checked")
		}), $(".vc_settings-tab-control").on("click", function (e) {
			if (e.preventDefault(), $(this).hasClass("nav-tab-active")) return !1;
			$(this).attr("href");
			$(".vc_settings-tabs > .nav-tab-active").removeClass("nav-tab-active"), $(this).addClass("nav-tab-active")
		}), $(".vc_settings-tab-content").on("submit", function () {
			return !0
		}), $(".vc_show_example").on("click", function (e) {
			e.preventDefault();
			var $helper = $(".vc_helper");
			if ($helper.is(":animated")) return !1;
			$helper.toggle(100)
		}), $(".color-control").wpColorPicker(), $("#vc_settings-color-restore-default").on("click", function (e) {
			e.preventDefault(), confirm(window.i18nLocaleSettings.are_you_sure_reset_color) && ($("#vc_settings-color-action").val("restore_color"), $("#vc_settings-color").attr("action", window.location.href).find("[type=submit]").click())
		}), $("#wpb_js_use_custom").on("change", function () {
			this.checked ? $("#vc_settings-color").addClass("color_enabled") : $("#vc_settings-color").removeClass("color_enabled")
		}), $("#vc_settings-updater-button").on("click", function (e) {
			var $this = $(this),
				action = $this.data("vcAction"),
				$parent = $this.parent();
			return $parent.addClass("loading"), $this.attr("disabled", !0), $.getJSON(window.ajaxurl, {
				action: "vc_get_" + action + "_url",
				_vcnonce: window.vcAdminNonce
			}, function (response) {
				response && response.status ? window.location = response.url : (alert("Failed to get response from server. Please try again"), $parent.removeClass("loading"), $this.removeAttr("disabled"))
			}).error(function () {
				alert("Failed to get response from server. Please refresh page and try again"), $parent.removeClass("loading"), $this.removeAttr("disabled")
			}), e.preventDefault(), !1
		});
		var $css_editor = $("#wpb_csseditor"),
			$css_editor_input = $("textarea.custom_css.wpb_csseditor");

		function showMessageMore(text, typeClass, timeout, remove) {
			remove && $(".vc_atm-message").remove();
			var $message = $('<div class="vc_atm-message ' + (typeClass || "") + '" style="display: none;"><p></p></div>');
			return $message.find("p").text(text), _.isUndefined(timeout) || window.setTimeout(function () {
				$message.fadeOut(500, function () {
					$(this).remove()
				})
			}, timeout), $message
		}
		$css_editor.length && (window.css_editor = new Vc_postSettingsEditor, window.css_editor.setEditor($css_editor_input.val()), window.css_editor.getEditor().on("change", function () {
			$css_editor_input.val(window.css_editor.getValue())
		})), $("#vc_settings-vc-pointers-reset").on("click", function (e) {
			e.preventDefault(), $.post(window.ajaxurl, {
				action: "vc_pointer_reset",
				_vcnonce: window.vcAdminNonce
			}), $(this).text($(this).data("vcDoneTxt"))
		});
		var lessBuilding = !1;
		$("#vc_settings-color").on("submit", function (e) {
			var $submitButton, modifyVars, variablesDataLinker, $spinner;
			e.preventDefault(), lessBuilding || ($submitButton = $("#submit_btn"), $("#wpb_js_use_custom").prop("checked") && "restore_color" !== $("#vc_settings-color-action").val() ? (lessBuilding = !0, modifyVars = $(this).serializeArray(), variablesDataLinker = $submitButton.data("vc-less-variables"), $spinner = $('<span class="vc_settings-spinner vc_ui-wp-spinner"></span>'), $submitButton.val(window.i18nLocaleSettings.saving), $spinner.insertBefore($submitButton).show(), _.delay(function () {
				vc.less.build({
					modifyVars: modifyVars,
					variablesDataLinker: variablesDataLinker,
					lessPath: $submitButton.data("vc-less-path"),
					rootpath: $submitButton.data("vc-less-root")
				}, function (output, error) {
					if (_.isUndefined(output) || _.isUndefined(output.css)) _.isUndefined(error) || (window.console && window.console.warn && window.console.warn("build error", error), showMessageMore(window.i18nLocaleSettings.save_error + ". " + error, "error", void 0, !0).insertBefore($submitButton.parent()).fadeIn(500), $submitButton.val(window.i18nLocaleSettings.save), lessBuilding = !1, $spinner.remove());
					else {
						$('[name="wpb_js_compiled_js_composer_less"]').val(output.css);
						var $form = $("#vc_settings-color");
						$.ajax({
							type: "POST",
							url: $form.attr("action"),
							data: $form.eq(0).serializeArray(),
							success: function () {
								showMessageMore(window.i18nLocaleSettings.saved, "updated", 5e3, !0).insertBefore($submitButton.parent()).fadeIn(500), $submitButton.val(window.i18nLocaleSettings.save), lessBuilding = !1, $spinner.remove()
							},
							error: function () {
								showMessageMore(window.i18nLocaleSettings.form_save_error, "error", void 0, !0).insertBefore($submitButton.parent()).fadeIn(500), $submitButton.val(window.i18nLocaleSettings.save), lessBuilding = !1, $spinner.remove()
							}
						})
					}
				})
			}, 100)) : this.submit())
		})
	});