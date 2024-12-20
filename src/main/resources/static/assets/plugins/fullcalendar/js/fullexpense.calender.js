/**
* Author: Coderthemes
* Component: Full-Calendar
*/

!function($) {
    "use strict";
    function refreshSelectPicker() {
        $('.selectpicker').selectpicker('refresh');
        $('#exp_add_date').closest('div').datepicker({
            autoclose: true,
            todayHighlight: true,
            format: "dd/mm/yyyy",
            clearBtn: true
        });
        
        $('#exp_edit_date').closest('div').datepicker({
            autoclose: true,
            todayHighlight: true,
            format: "dd/mm/yyyy",
            clearBtn: true
        });
    }
    var CalendarApp = function() {
        this.$body = $("body")
        this.$modal = $('#event-modal'),
        this.$event = ('#external-events div.external-event'),
        this.$calendar = $('#fullexpensecalendar'),
        this.$saveCategoryBtn = $('.save-category'),
        this.$categoryForm = $('#add-category form'),
        this.$extEvents = $('#external-events'),
        this.$calendarObj = null
    };


    /* on drop */
    CalendarApp.prototype.onDrop = function (eventObj, date) { 
        var $this = this;
            // retrieve the dropped element's stored Event Object
            var originalEventObject = eventObj.data('eventObject');
            var $categoryClass = eventObj.attr('data-class');
            // we need to copy it, so that multiple events don't have a reference to the same object
            var copiedEventObject = $.extend({}, originalEventObject);
            // assign it the date that was reported
            copiedEventObject.start = date;
            if ($categoryClass)
                copiedEventObject['className'] = [$categoryClass];
            // render the event on the calendar
            $this.$calendar.fullCalendar('renderEvent', copiedEventObject, true);
            // is the "remove after drop" checkbox checked?
            if ($('#drop-remove').is(':checked')) {
                // if so, remove the element from the "Draggable Events" list
                eventObj.remove();
            }
    },
    /* on click on event */
    CalendarApp.prototype.onEventClick =  function (calEvent, jsEvent, view) {
        var $this = this;
          var form = $("<form></form>");
            form.append("<div class='row'><div class='col-md-4 colmspadding'><div class='form-group'><label>Date</label><div class='input-group date'><input type='text' class='form-control' placeholder='dd/mm/yyyy' id='exp_edit_date'><span class='input-group-addon inputgroups'><i class='mdi mdi-calendar'></i></span></div></div></div><div class='col-md-4 colmspadding'><div class='form-group'><label>Client</label><select class='selectpicker' data-style='lineheight12 bg-transfer' data-live-search='true' data-size='10'><option value='' selected='selected'>Select</option><option value='1'>Bank of Montreal</option><option value='2'>Bentall Kennedy</option><option value='3'>Cadillac Fairview</option><option value='4'>Crown Property Management</option><option value='5'>Harvard Property Management Inc.</option></select></div></div><div class='col-md-4 colmspadding'><div class='form-group'><label>Site</label><select class='selectpicker' data-style='lineheight12 bg-transfer' data-live-search='true' data-size='10'><option value='' selected='selected'>Select</option><option value='1'>Barrie Computer Centre (BCC)</option><option value='2'>BOSC</option><option value='3'>Institute for Learning (IFL)</option><option value='4'>Mortgage Centre</option><option value='5'>Scarborough Computer Centre (SCC)</option></select></div></div><div class='col-md-4 colmspadding'><div class='form-group'><label>Building</label><select class='selectpicker' data-style='lineheight12 bg-transfer' data-live-search='true' data-size='10'><option value='' selected='selected'>Select</option><option value='1'>Central Utility Building (CUB)</option><option value='2'>Computer Room Building (CRB)</option></select></div></div><div class='col-md-4 colmspadding'><div class='form-group'><label>Expense</label><select class='selectpicker' data-style='lineheight12 bg-transfer' data-live-search='true' data-size='10'><option value='' selected='selected'>Select</option><option value='1'>Expense 1</option><option value='2'>Expense 2</option></select></div></div><div class='col-md-2 colmspadding'><div class='form-group'><label>Amount</label><input type='text' class='form-control text-right'></div></div>");
            $this.$modal.modal({
              backdrop: 'static'
          });
            $this.$modal.find('.delete-event').show().end().find('.save-event').hide().end().find('.modal-body').empty().prepend(form).end().find('.delete-event').unbind('click').click(function () {
                $this.$calendarObj.fullCalendar('removeEvents', function (ev) {
                    return (ev._id == calEvent._id);
                });
                $this.$modal.modal('hide');
            });
            $this.$modal.find('form').on('submit', function () {
                calEvent.title = form.find("input[type=text]").val();
                $this.$calendarObj.fullCalendar('updateEvent', calEvent);
                $this.$modal.modal('hide');
                return false;
          });
            refreshSelectPicker();
      
    },
    /* on select */
    CalendarApp.prototype.onSelect = function (start, end, allDay) {
        var $this = this;
            $this.$modal.modal({
                backdrop: 'static'
            });
            var form = $("<form></form>");
            form.append("<div class='row'></div>");
            form.find(".row")
                .append("<div class='col-md-4 colmspadding'><div class='form-group'><label>Date</label><div class='input-group date'><input type='text' class='form-control' placeholder='dd/mm/yyyy' id='exp_add_date'><span class='input-group-addon inputgroups'><i class='mdi mdi-calendar'></i></span></div></div></div><div class='col-md-4 colmspadding'><div class='form-group'><label>Client</label><select class='selectpicker' data-style='lineheight12 bg-transfer' data-live-search='true' data-size='10'><option value='' selected='selected'>Select</option><option value='1'>Bank of Montreal</option><option value='2'>Bentall Kennedy</option><option value='3'>Cadillac Fairview</option><option value='4'>Crown Property Management</option><option value='5'>Harvard Property Management Inc.</option></select></div></div><div class='col-md-4 colmspadding'><div class='form-group'><label>Site</label><select class='selectpicker' data-style='lineheight12 bg-transfer' data-live-search='true' data-size='10'><option value='' selected='selected'>Select</option><option value='1'>Barrie Computer Centre (BCC)</option><option value='2'>BOSC</option><option value='3'>Institute for Learning (IFL)</option><option value='4'>Mortgage Centre</option><option value='5'>Scarborough Computer Centre (SCC)</option></select></div></div><div class='col-md-4 colmspadding'><div class='form-group'><label>Building</label><select class='selectpicker' data-style='lineheight12 bg-transfer' data-live-search='true' data-size='10'><option value='' selected='selected'>Select</option><option value='1'>Central Utility Building (CUB)</option><option value='2'>Computer Room Building (CRB)</option></select></div></div><div class='col-md-4 colmspadding'><div class='form-group'><label>Expense</label><select class='selectpicker' data-style='lineheight12 bg-transfer' data-live-search='true' data-size='10'><option value='' selected='selected'>Select</option><option value='1'>Expense 1</option><option value='2'>Expense 2</option></select></div></div><div class='col-md-2 colmspadding'><div class='form-group'><label>Amount</label><input type='text' class='form-control text-right'></div></div>")
        
                
            $this.$modal.find('.delete-event').hide().end().find('.save-event').show().end().find('.modal-body').empty().prepend(form).end().find('.save-event').unbind('click').click(function () {
                form.submit();
            });
            $this.$modal.find('form').on('submit', function () {
                var beginning = form.find("input[name='beginning']").val();
                var ending = form.find("input[name='ending']").val();
                var categoryClass = form.find("select[name='category'] option:checked").val();
                return false;
                
            });
            $this.$calendarObj.fullCalendar('unselect');
            refreshSelectPicker();
    },
    CalendarApp.prototype.enableDrag = function() {
        //init events
        $(this.$event).each(function () {
            // create an Event Object (http://arshaw.com/fullcalendar/docs/event_data/Event_Object/)
            // it doesn't need to have a start or end
            var eventObject = {
                title: $.trim($(this).text()) // use the element's text as the event title
            };
            // store the Event Object in the DOM element so we can get to it later
            $(this).data('eventObject', eventObject);
            // make the event draggable using jQuery UI
            $(this).draggable({
                zIndex: 999,
                revert: true,      // will cause the event to go back to its
                revertDuration: 0  //  original position after the drag
            });
        });
    }
    /* Initializing */
    CalendarApp.prototype.init = function() {
        this.enableDrag();
        /*  Initialize the calendar  */
        var date = new Date();
        var d = date.getDate();
        var m = date.getMonth();
        var y = date.getFullYear();
        var form = '';
        var today = new Date($.now());

        var defaultEvents =  [{
                title: '50 $',
                start: '2019-02-12',
                end: '2019-02-12',
                overlap: false,
                className: 'bg-success'
            },
            {
                title: '60 $',
                start: '2019-02-13',
                end: '2019-02-13',
                overlap: false,
                className: 'bg-success'
            },
            {
                title: '35 $',
                start: '2019-02-14',
                end: '2019-02-14',
                overlap: false,
                className: 'bg-success'
            },
            {
                title: '75 $',
                start: '2019-02-15',
                end: '2019-02-15',
                overlap: false,
                className: 'bg-success'
            },
            {
                title: '25 $',
                start: '2019-02-18',
                end: '2019-02-18',
                overlap: false,
                className: 'bg-success'
            },
            {
                title: '90 $',
                start: '2019-02-20',
                end: '2019-02-20',
                overlap: false,
                className: 'bg-success'
            },
            {
                title: '100 $',
                start: '2019-02-22',
                end: '2019-02-22',
                overlap: false,
                className: 'bg-success'
            },
            {
                title: '84 $',
                start: '2019-02-25',
                end: '2019-02-25',
                overlap: false,
                className: 'bg-success'
            },
            {
                title: '75 $',
                start: '2019-02-28',
                end: '2019-02-28',
                overlap: false,
                className: 'bg-success'
            }];

        var $this = this;
        $this.$calendarObj = $this.$calendar.fullCalendar({
            slotDuration: '00:15:00', /* If we want to split day time each 15minutes */
            minTime: '08:00:00',
            maxTime: '20:00:00',  
            defaultView: 'month',  
            handleWindowResize: true,   
            height: $(window).height() - 20,   
            header: {
                left: 'prev,next today',
                center: 'title',
//                right: 'month,agendaWeek,agendaDay'
                right: 'month,agendaWeek'
            },
            events: defaultEvents,
            editable: true,
            droppable: true, // this allows things to be dropped onto the calendar !!!
            eventLimit: true, // allow "more" link when too many events
            selectable: true,
            drop: function(date) { $this.onDrop($(this), date); },
            select: function (start, end, allDay) { $this.onSelect(start, end, allDay); },
            eventClick: function(calEvent, jsEvent, view) { $this.onEventClick(calEvent, jsEvent, view); }

        });

        //on new event
        this.$saveCategoryBtn.on('click', function(){
            var categoryName = $this.$categoryForm.find("input[name='category-name']").val();
            var categoryColor = $this.$categoryForm.find("select[name='category-color']").val();
            if (categoryName !== null && categoryName.length != 0) {
                $this.$extEvents.append('<div class="external-event bg-' + categoryColor + '" data-class="bg-' + categoryColor + '" style="position: relative;"><i class="mdi mdi-checkbox-blank-circle mr-2 vertical-middle"></i>' + categoryName + '</div>')
                $this.enableDrag();
            }

        });
    },

   //init CalendarApp
    $.CalendarApp = new CalendarApp, $.CalendarApp.Constructor = CalendarApp;
}(window.jQuery),

//initializing CalendarApp
function($) {
    "use strict";
    $.CalendarApp.init()
}(window.jQuery);